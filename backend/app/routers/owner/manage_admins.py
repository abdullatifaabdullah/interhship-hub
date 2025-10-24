"""
PATCH /owner/admins/{id}/approve - Owner approve admin
PATCH /owner/admins/{id}/suspend - Owner suspend admin  
PATCH /owner/admins/{id}/reject - Owner reject admin
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.owner import AdminStatusUpdateOut
from ...core.auth import require_owner
from ...db import fetchrow

router = APIRouter()


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
