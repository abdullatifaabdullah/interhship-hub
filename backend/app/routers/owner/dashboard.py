"""
GET /owner/dashboard - Owner dashboard summary
GET /owner/pending-posts - Owner view pending internship posts
"""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime
from ...schemas.owner import OwnerDashboardOut
from ...core.auth import require_owner
from ...db import fetchval, fetch

router = APIRouter()


class PendingPostOut(BaseModel):
    """Response schema for pending internship post."""
    id: int = Field(..., description="Internship ID")
    title: str = Field(..., description="Internship title")
    description: str = Field(..., description="Internship description")
    location: str = Field(..., description="Internship location")
    tags: List[str] = Field(..., description="Internship tags")
    created_by: int = Field(..., description="Creator user ID")
    creator_name: str = Field(..., description="Creator full name")
    creator_email: str = Field(..., description="Creator email")
    created_at: datetime = Field(..., description="Creation timestamp")


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


@router.get("/owner/pending-posts", response_model=List[PendingPostOut])
async def get_pending_posts(
    current_user: dict = Depends(require_owner)
):
    """
    Get all pending internship posts for owner review.
    Only owner can access this endpoint.
    """
    # Get pending posts with creator information
    posts = await fetch(
        """
        SELECT 
            i.id,
            i.title,
            i.description,
            i.location,
            i.tags,
            i.created_by,
            u.full_name as creator_name,
            u.email as creator_email,
            i.created_at
        FROM internships i
        JOIN users u ON i.created_by = u.id
        WHERE i.status = 'pending_approval'
        ORDER BY i.created_at DESC
        """
    )
    
    return [PendingPostOut(**post) for post in posts]
