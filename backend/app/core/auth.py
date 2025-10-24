"""
JWT Authentication and Refresh Token Management

This module provides:
- JWT access token creation and verification
- Refresh token generation and rotation
- User authentication dependencies
- Role-based access control helpers
"""

import hashlib
import secrets
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any, Tuple

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.hash import bcrypt

from ..core.config import JWT_SECRET, JWT_ALGORITHM, ACCESS_TOKEN_MIN, REFRESH_TOKEN_DAYS
from ..db import fetchrow, execute

# OAuth2 scheme for Bearer token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/sign-in")

def create_access_token(payload: Dict[str, Any], expires_minutes: int = None) -> Tuple[str, int]:
    """
    Create a JWT access token with the given payload.
    
    Args:
        payload: Dictionary containing token claims (sub, role, etc.)
        expires_minutes: Token expiration time in minutes (defaults to ACCESS_TOKEN_MIN)
    
    Returns:
        Tuple of (token_string, expires_in_seconds)
    """
    if expires_minutes is None:
        expires_minutes = ACCESS_TOKEN_MIN
    
    now = datetime.now(timezone.utc)
    expire = now + timedelta(minutes=expires_minutes)
    
    payload.update({
        "exp": expire,
        "iat": now,
        "type": "access"
    })
    
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    expires_in_seconds = expires_minutes * 60
    
    return token, expires_in_seconds

def create_refresh_token(user_id: int) -> Tuple[str, Dict[str, Any]]:
    """
    Create a new refresh token for the given user.
    
    Args:
        user_id: ID of the user
    
    Returns:
        Tuple of (raw_token_string, metadata_dict)
    """
    # Generate a secure random token (256-bit)
    raw_token = secrets.token_urlsafe(48)
    
    # Generate unique JTI (JWT ID) for tracking
    jti = uuid.uuid4()
    
    # Calculate expiration
    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(days=REFRESH_TOKEN_DAYS)
    
    metadata = {
        "jti": jti,
        "expires_at": expires_at,
        "user_id": user_id
    }
    
    return raw_token, metadata

def hash_refresh_token(raw_token: str) -> str:
    """
    Create a SHA-256 hash of the refresh token for secure storage.
    
    Args:
        raw_token: The raw refresh token string
    
    Returns:
        SHA-256 hex digest of the token
    """
    return hashlib.sha256(raw_token.encode()).hexdigest()

async def store_refresh_token(
    user_id: int,
    jti: uuid.UUID,
    token_hash: str,
    expires_at: datetime,
    user_agent: Optional[str] = None,
    ip_address: Optional[str] = None
) -> None:
    """
    Store a refresh token in the database.
    
    Args:
        user_id: ID of the user
        jti: Unique JWT ID for the token
        token_hash: SHA-256 hash of the raw token
        expires_at: Token expiration timestamp
        user_agent: User agent string (optional)
        ip_address: IP address (optional)
    """
    # Ensure expires_at is timezone-aware and convert to UTC
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    else:
        expires_at = expires_at.astimezone(timezone.utc)
    
    # Convert to naive UTC datetime for PostgreSQL
    expires_at_naive = expires_at.replace(tzinfo=None)
    
    
    await execute(
        """
        INSERT INTO refresh_tokens (user_id, jti, token_hash, expires_at, user_agent, ip_address)
        VALUES ($1, $2, $3, $4, $5, $6)
        """,
        user_id, jti, token_hash, expires_at_naive, user_agent, ip_address
    )

async def get_refresh_record_by_hash(token_hash: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve a refresh token record by its hash, including user information.
    
    Args:
        token_hash: SHA-256 hash of the refresh token
    
    Returns:
        Dictionary containing token and user data, or None if not found
    """
    return await fetchrow(
        """
        SELECT rt.*, u.role, u.email
        FROM refresh_tokens rt
        JOIN users u ON rt.user_id = u.id
        WHERE rt.token_hash = $1
        """,
        token_hash
    )

async def revoke_refresh_token(jti: uuid.UUID, replaced_by: Optional[uuid.UUID] = None) -> None:
    """
    Revoke a refresh token by marking it as revoked.
    
    Args:
        jti: JWT ID of the token to revoke
        replaced_by: JWT ID of the token that replaced this one (optional)
    """
    await execute(
        """
        UPDATE refresh_tokens 
        SET revoked = TRUE, replaced_by = $2
        WHERE jti = $1
        """,
        jti, replaced_by
    )

async def revoke_all_user_refresh_tokens(user_id: int) -> None:
    """
    Revoke all refresh tokens for a specific user (logout all devices).
    
    Args:
        user_id: ID of the user
    """
    await execute(
        """
        UPDATE refresh_tokens 
        SET revoked = TRUE
        WHERE user_id = $1 AND revoked = FALSE
        """,
        user_id
    )

def decode_access_token(token: str) -> Dict[str, Any]:
    """
    Decode and verify a JWT access token.
    
    Args:
        token: The JWT token string
    
    Returns:
        Dictionary containing token payload
    
    Raises:
        HTTPException: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        
        # Verify token type
        if payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict[str, Any]:
    """
    FastAPI dependency to get the current authenticated user.
    
    Args:
        token: Bearer token from Authorization header
    
    Returns:
        Dictionary containing user information
    
    Raises:
        HTTPException: If token is invalid or user not found
    """
    # Decode and verify the access token
    payload = decode_access_token(token)
    
    # Extract user ID from token
    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Fetch user from database
    user = await fetchrow(
        "SELECT id, email, role, admin_status FROM users WHERE id = $1",
        int(user_id)
    )
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return {
        "id": user["id"],
        "email": user["email"],
        "role": user["role"],
        "admin_status": user["admin_status"]
    }

# Role-based access control helpers
async def require_owner(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """Require the current user to have owner role."""
    if current_user["role"] != "owner":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Owner access required"
        )
    return current_user

async def require_admin(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """Require the current user to have admin role or be an owner."""
    if current_user["role"] not in ["admin", "owner"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

async def require_student(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """Require the current user to have student role."""
    if current_user["role"] != "student":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Student access required"
        )
    return current_user

async def require_admin_active(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """Require the current user to have admin role with active status or be an owner."""
    if current_user["role"] == "owner":
        return current_user
    elif current_user["role"] == "admin" and current_user["admin_status"] == "active":
        return current_user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Active admin access required"
        )

# Utility functions
def now_utc() -> datetime:
    """Get current UTC datetime."""
    return datetime.now(timezone.utc)

async def cleanup_expired_tokens() -> int:
    """
    Clean up expired refresh tokens from the database.
    
    Returns:
        Number of tokens removed
    """
    result = await execute(
        """
        DELETE FROM refresh_tokens 
        WHERE expires_at < $1
        """,
        now_utc()
    )
    # Extract number of affected rows from result
    return int(result.split()[-1]) if result else 0
