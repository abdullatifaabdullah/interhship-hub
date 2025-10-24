"""
GET /owner/admins - Owner view all admins
"""

from fastapi import APIRouter, Depends, Query
from ...schemas.owner import PaginatedAdminsOut, AdminOut
from ...core.auth import require_owner
from ...db import fetch, fetchval

router = APIRouter()


@router.get("/owner/admins", response_model=PaginatedAdminsOut)
async def get_all_admins(
    current_user: dict = Depends(require_owner),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page")
):
    """
    Get paginated list of all admin users.
    Only owner can access this endpoint.
    """
    offset = (page - 1) * per_page
    
    # Get all admin users
    admins = await fetch(
        """
        SELECT id, email, full_name, admin_status, created_at
        FROM users
        WHERE role = 'admin'
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
        """,
        per_page, offset
    )
    
    # Get total count
    total = await fetchval("SELECT COUNT(*) FROM users WHERE role = 'admin'")
    
    # Convert to response format
    admin_list = [
        AdminOut(
            id=admin["id"],
            email=admin["email"],
            full_name=admin["full_name"],
            admin_status=admin["admin_status"],
            created_at=admin["created_at"]
        )
        for admin in admins
    ]
    
    return PaginatedAdminsOut(
        admins=admin_list,
        total=total,
        page=page,
        per_page=per_page,
        has_next=offset + per_page < total,
        has_prev=page > 1
    )
