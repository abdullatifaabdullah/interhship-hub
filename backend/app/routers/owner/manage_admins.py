"""
POST /owner/admins/create - Owner create new admin
PATCH /owner/admins/{id}/approve - Owner approve admin
PATCH /owner/admins/{id}/suspend - Owner suspend admin  
PATCH /owner/admins/{id}/reject - Owner reject admin
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from ...schemas.owner import AdminStatusUpdateOut
from ...core.auth import require_owner
from ...db import fetchrow, execute

router = APIRouter()


class AdminCreateRequest(BaseModel):
    """Schema for creating new admin user."""
    email: str = Field(..., description="Admin email")
    full_name: str = Field(..., description="Admin full name")
    password: str = Field(..., description="Admin password")


@router.post("/owner/admins/create", response_model=AdminStatusUpdateOut)
async def create_admin(
    admin_data: AdminCreateRequest,
    current_user: dict = Depends(require_owner)
):
    """
    Create a new admin user.
    Only owner can create admin accounts.
    """
    # Check if user already exists
    existing_user = await fetchrow(
        "SELECT id, role FROM users WHERE email = $1",
        admin_data.email
    )
    
    if existing_user:
        if existing_user["role"] == "admin":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User is already an admin"
            )
        # Update existing user to admin
        await execute(
            """
            UPDATE users 
            SET role = 'admin', admin_status = 'active'
            WHERE id = $1
            """,
            existing_user["id"]
        )
        return AdminStatusUpdateOut(id=existing_user["id"], admin_status="active")
    else:
        # Create new admin user
        from ...core.security import hash_password
        password_hash = hash_password(admin_data.password)
        
        admin_id = await execute(
            """
            INSERT INTO users (email, password_hash, full_name, role, admin_status)
            VALUES ($1, $2, $3, 'admin', 'active')
            RETURNING id
            """,
            admin_data.email,
            password_hash,
            admin_data.full_name
        )
        
        return AdminStatusUpdateOut(id=admin_id, admin_status="active")


@router.patch("/owner/admins/{admin_id}/approve", response_model=AdminStatusUpdateOut)
async def approve_admin(
    admin_id: int,
    current_user: dict = Depends(require_owner)
):
    """
    Approve an admin user.
    
    Rules:
    - Only owner can approve
    - Sets admin_status to 'active'
    """
    # Check if user exists and is an admin
    user = await fetchrow(
        "SELECT id, role FROM users WHERE id = $1",
        admin_id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not an admin"
        )
    
    # Update admin status to active
    updated_user = await fetchrow(
        """
        UPDATE users 
        SET admin_status = 'active'
        WHERE id = $1
        RETURNING id, admin_status
        """,
        admin_id
    )
    
    return AdminStatusUpdateOut(**updated_user)


@router.patch("/owner/admins/{admin_id}/suspend", response_model=AdminStatusUpdateOut)
async def suspend_admin(
    admin_id: int,
    current_user: dict = Depends(require_owner)
):
    """
    Suspend an admin user.
    
    Rules:
    - Only owner can suspend
    - Sets admin_status to 'suspended'
    """
    # Check if user exists and is an admin
    user = await fetchrow(
        "SELECT id, role FROM users WHERE id = $1",
        admin_id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not an admin"
        )
    
    # Update admin status to suspended
    updated_user = await fetchrow(
        """
        UPDATE users 
        SET admin_status = 'suspended'
        WHERE id = $1
        RETURNING id, admin_status
        """,
        admin_id
    )
    
    return AdminStatusUpdateOut(**updated_user)


@router.patch("/owner/admins/{admin_id}/reject", response_model=AdminStatusUpdateOut)
async def reject_admin(
    admin_id: int,
    current_user: dict = Depends(require_owner)
):
    """
    Reject an admin user.
    
    Rules:
    - Only owner can reject
    - Sets admin_status to 'rejected'
    """
    # Check if user exists and is an admin
    user = await fetchrow(
        "SELECT id, role FROM users WHERE id = $1",
        admin_id
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not an admin"
        )
    
    # Update admin status to rejected
    updated_user = await fetchrow(
        """
        UPDATE users 
        SET admin_status = 'rejected'
        WHERE id = $1
        RETURNING id, admin_status
        """,
        admin_id
    )
    
    return AdminStatusUpdateOut(**updated_user)
