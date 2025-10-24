"""
GET /admin/dashboard/cards - Admin dashboard statistics cards
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from ...core.auth import require_admin_active
from ...db import fetchrow

router = APIRouter()


class AdminDashboardCardsOut(BaseModel):
    """Response schema for admin dashboard cards."""
    total_internships: int = Field(..., description="Total internships created by admin")
    pending_applications: int = Field(..., description="Pending applications for admin's internships")
    approved_applications: int = Field(..., description="Approved applications for admin's internships")
    rejected_applications: int = Field(..., description="Rejected applications for admin's internships")


@router.get("/admin/dashboard/cards", response_model=AdminDashboardCardsOut)
async def get_admin_dashboard_cards(
    current_user: dict = Depends(require_admin_active)
):
    """
    Get admin dashboard statistics cards.
    
    Returns:
    - total_internships: Number of internships created by this admin
    - pending_applications: Number of pending applications for admin's internships
    - approved_applications: Number of approved applications for admin's internships
    - rejected_applications: Number of rejected applications for admin's internships
    """
    admin_id = current_user["id"]
    
    # Get dashboard statistics from view
    stats = await fetchrow(
        "SELECT * FROM v_admin_dashboard_stats WHERE admin_id = $1",
        admin_id
    )
    
    if not stats:
        # Return zeros if no data found
        return AdminDashboardCardsOut(
            total_internships=0,
            pending_applications=0,
            approved_applications=0,
            rejected_applications=0
        )
    
    return AdminDashboardCardsOut(
        total_internships=stats["total_internships"],
        pending_applications=stats["pending_applications"],
        approved_applications=stats["approved_applications"],
        rejected_applications=stats["rejected_applications"]
    )
