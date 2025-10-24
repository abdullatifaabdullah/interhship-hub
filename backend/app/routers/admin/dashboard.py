"""
GET /admin/dashboard - Admin dashboard summary
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from ...core.auth import require_admin_active
from ...db import fetchval, fetch

router = APIRouter()


class AdminDashboardOut(BaseModel):
    """Response schema for admin dashboard."""
    total_internships: int = Field(..., description="Total internships created by admin")
    pending_applications: int = Field(..., description="Pending applications for admin's internships")
    approved_applications: int = Field(..., description="Approved applications for admin's internships")
    rejected_applications: int = Field(..., description="Rejected applications for admin's internships")


@router.get("/admin/dashboard", response_model=AdminDashboardOut)
async def get_admin_dashboard(
    current_user: dict = Depends(require_admin_active)
):
    """
    Get admin dashboard with aggregate counts.
    
    Returns:
    - total_internships: Number of internships created by this admin
    - pending_applications: Number of pending applications for admin's internships
    - approved_applications: Number of approved applications for admin's internships
    - rejected_applications: Number of rejected applications for admin's internships
    """
    admin_id = current_user["id"]
    
    # Get total internships created by this admin
    total_internships = await fetchval(
        "SELECT COUNT(*) FROM internships WHERE created_by = $1",
        admin_id
    )
    
    # Get application counts for admin's internships
    pending_applications = await fetchval(
        """
        SELECT COUNT(*) FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE i.created_by = $1 AND a.status = 'submitted'
        """,
        admin_id
    )
    
    approved_applications = await fetchval(
        """
        SELECT COUNT(*) FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE i.created_by = $1 AND a.status = 'review'
        """,
        admin_id
    )
    
    rejected_applications = await fetchval(
        """
        SELECT COUNT(*) FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE i.created_by = $1 AND a.status = 'rejected'
        """,
        admin_id
    )
    
    return AdminDashboardOut(
        total_internships=total_internships,
        pending_applications=pending_applications,
        approved_applications=approved_applications,
        rejected_applications=rejected_applications
    )
