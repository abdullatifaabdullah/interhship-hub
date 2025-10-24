"""
Authentication router with JWT and refresh token endpoints

This module provides:
- POST /auth/sign-in - User authentication with JWT tokens
- POST /auth/refresh - Token refresh with rotation
- POST /auth/sign-out - Token revocation
- GET /me - Current user profile
- POST /auth/sign-up-admin - Admin registration (pending approval)
- POST /auth/sign-up-student - Student registration
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request
from passlib.hash import bcrypt
from datetime import timezone

from ..core.auth import (
    create_access_token,
    create_refresh_token,
    hash_refresh_token,
    store_refresh_token,
    get_refresh_record_by_hash,
    revoke_refresh_token,
    get_current_user,
    now_utc
)
from ..schemas.auth import (
    SignInRequest,
    RefreshTokenRequest,
    TokenResponse,
    UserProfile,
    SignOutRequest,
    SignOutResponse,
    SignUpAdminRequest,
    SignUpStudentRequest,
    SignUpResponse
)
from ..db import fetchrow

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/sign-in", response_model=TokenResponse)
async def sign_in(body: SignInRequest, request: Request):
    """
    Authenticate user and issue JWT access token and refresh token.
    
    Args:
        body: Sign-in credentials
        request: FastAPI request object for user agent and IP
    
    Returns:
        TokenResponse with access and refresh tokens
    
    Raises:
        HTTPException: If credentials are invalid
    """
    # Find user by email
    user_row = await fetchrow(
        "SELECT id, email, role, admin_status, password_hash FROM users WHERE email = $1",
        body.email.lower()
    )
    
    if not user_row:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password using bcrypt
    if not bcrypt.verify(body.password, user_row["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create access token
    access_token, expires_in = create_access_token({
        "sub": str(user_row["id"]),
        "role": user_row["role"]
    })
    
    # Create refresh token
    raw_refresh_token, refresh_meta = create_refresh_token(user_id=user_row["id"])
    token_hash = hash_refresh_token(raw_refresh_token)
    
    # Store refresh token in database
    await store_refresh_token(
        user_id=user_row["id"],
        jti=refresh_meta["jti"],
        token_hash=token_hash,
        expires_at=refresh_meta["expires_at"],
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None
    )
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=raw_refresh_token,
        token_type="bearer",
        expires_in=expires_in,
        role=user_row["role"]
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_tokens(body: RefreshTokenRequest, request: Request):
    """
    Refresh access token using refresh token with rotation.
    
    Args:
        body: Refresh token request
        request: FastAPI request object for user agent and IP
    
    Returns:
        TokenResponse with new access and refresh tokens
    
    Raises:
        HTTPException: If refresh token is invalid
    """
    # Hash the refresh token and find the record
    token_hash = hash_refresh_token(body.refresh_token)
    refresh_record = await get_refresh_record_by_hash(token_hash)
    
    if not refresh_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Check if token is revoked or expired
    expires_at = refresh_record["expires_at"]
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    
    if refresh_record["revoked"] or expires_at <= now_utc():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )
    
    # Create new refresh token for rotation
    new_raw_refresh_token, new_refresh_meta = create_refresh_token(
        user_id=refresh_record["user_id"]
    )
    new_token_hash = hash_refresh_token(new_raw_refresh_token)
    
    # Revoke old token and mark it as replaced
    await revoke_refresh_token(
        refresh_record["jti"],
        replaced_by=new_refresh_meta["jti"]
    )
    
    # Store new refresh token
    await store_refresh_token(
        user_id=refresh_record["user_id"],
        jti=new_refresh_meta["jti"],
        token_hash=new_token_hash,
        expires_at=new_refresh_meta["expires_at"],
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None
    )
    
    # Create new access token
    access_token, expires_in = create_access_token({
        "sub": str(refresh_record["user_id"]),
        "role": refresh_record["role"]
    })
    
    return TokenResponse(
        access_token=access_token,
        refresh_token=new_raw_refresh_token,
        token_type="bearer",
        expires_in=expires_in,
        role=refresh_record["role"]
    )


@router.post("/sign-out", response_model=SignOutResponse)
async def sign_out(body: SignOutRequest):
    """
    Revoke refresh token (sign out).
    
    Args:
        body: Sign-out request with refresh token
    
    Returns:
        SignOutResponse confirming operation
    """
    # Hash the refresh token and find the record
    token_hash = hash_refresh_token(body.refresh_token)
    refresh_record = await get_refresh_record_by_hash(token_hash)
    
    if refresh_record:
        # Revoke the token
        await revoke_refresh_token(refresh_record["jti"])
    
    return SignOutResponse(ok=True)


@router.get("/me", response_model=UserProfile)
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """
    Get current user profile information.
    
    Args:
        current_user: Current authenticated user (from dependency)
    
    Returns:
        UserProfile with user information
    """
    return UserProfile(
        id=current_user["id"],
        email=current_user["email"],
        role=current_user["role"],
        admin_status=current_user.get("admin_status")
    )


@router.post("/sign-up-admin", response_model=SignUpResponse, status_code=status.HTTP_201_CREATED)
async def sign_up_admin(body: SignUpAdminRequest):
    """
    Register a new admin user.
    
    Args:
        body: Admin registration data
    
    Returns:
        SignUpResponse with success message and user ID
    
    Raises:
        HTTPException: If email already exists
    """
    # Check if email already exists
    existing_user = await fetchrow(
        "SELECT id FROM users WHERE email = $1",
        body.email.lower()
    )
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Hash password
    password_hash = bcrypt.hash(body.password)
    
    # Create admin user with pending status
    user = await fetchrow(
        """
        INSERT INTO users (email, password_hash, full_name, role, admin_status)
        VALUES ($1, $2, $3, 'admin', 'pending')
        RETURNING id
        """,
        body.email.lower(), password_hash, body.full_name
    )
    
    return SignUpResponse(
        ok=True,
        message="Admin account created successfully. Awaiting owner approval.",
        user_id=user["id"]
    )


@router.post("/sign-up-student", response_model=SignUpResponse, status_code=status.HTTP_201_CREATED)
async def sign_up_student(body: SignUpStudentRequest):
    """
    Register a new student user.
    
    Args:
        body: Student registration data
    
    Returns:
        SignUpResponse with success message and user ID
    
    Raises:
        HTTPException: If email already exists
    """
    # Check if email already exists
    existing_user = await fetchrow(
        "SELECT id FROM users WHERE email = $1",
        body.email.lower()
    )
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    # Hash password
    password_hash = bcrypt.hash(body.password)
    
    # Create student user
    user = await fetchrow(
        """
        INSERT INTO users (email, password_hash, full_name, role, admin_status)
        VALUES ($1, $2, $3, 'student', NULL)
        RETURNING id
        """,
        body.email.lower(), password_hash, body.full_name
    )
    
    return SignUpResponse(
        ok=True,
        message="Student account created successfully.",
        user_id=user["id"]
    )
