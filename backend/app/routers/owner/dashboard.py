"""
GET /owner/dashboard - Owner dashboard summary
"""

from fastapi import APIRouter, Depends
from ...schemas.owner import OwnerDashboardOut
from ...core.auth import require_owner
from ...db import fetchval

router = APIRouter()


@router.get("/owner/dashboard", response_model=OwnerDashboardOut)
async def get_owner_dashboard(
    current_user: dict = Depends(require_owner)
):
    """
    Get owner dashboard with aggregate counts.
    
    Returns:
    - pending_admins: Number of admins with pending status
    - active_admins: Number of admins with active status
    - pending_posts: Number of internships with pending_approval status
    - approved_posts: Number of internships with approved status
    - total_applications: Total number of applications
    """
    # Get all counts in parallel
    pending_admins = await fetchval(
        "SELECT COUNT(*) FROM users WHERE role = 'admin' AND admin_status = 'pending'"
    )
    
    active_admins = await fetchval(
        "SELECT COUNT(*) FROM users WHERE role = 'admin' AND admin_status = 'active'"
    )
    
    pending_posts = await fetchval(
        "SELECT COUNT(*) FROM internships WHERE status = 'pending_approval'"
    )
    
    approved_posts = await fetchval(
        "SELECT COUNT(*) FROM internships WHERE status = 'approved'"
    )
    
    total_applications = await fetchval(
        "SELECT COUNT(*) FROM applications"
    )
    
    return OwnerDashboardOut(
        pending_admins=pending_admins,
        active_admins=active_admins,
        pending_posts=pending_posts,
        approved_posts=approved_posts,
        total_applications=total_applications
    )
