"""
Pydantic schemas for owner endpoints
"""

from pydantic import BaseModel, Field
from typing import Optional


class AdminStatusUpdateOut(BaseModel):
    """Response schema for admin status updates."""
    id: int = Field(..., description="Admin user ID")
    admin_status: str = Field(..., description="New admin status")


class InternshipStatusUpdateOut(BaseModel):
    """Response schema for internship status updates."""
    id: int = Field(..., description="Internship ID")
    status: str = Field(..., description="New internship status")


class OwnerDashboardOut(BaseModel):
    """Response schema for owner dashboard."""
    pending_admins: int = Field(..., description="Number of pending admins")
    active_admins: int = Field(..., description="Number of active admins")
    pending_posts: int = Field(..., description="Number of pending internship posts")
    approved_posts: int = Field(..., description="Number of approved internship posts")
    total_applications: int = Field(..., description="Total number of applications")
