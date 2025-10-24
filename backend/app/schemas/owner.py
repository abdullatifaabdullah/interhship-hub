"""
Pydantic schemas for owner endpoints
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class AdminOut(BaseModel):
    """Response schema for admin user data."""
    id: int = Field(..., description="Admin user ID")
    email: str = Field(..., description="Admin email")
    full_name: str = Field(..., description="Admin full name")
    admin_status: Optional[str] = Field(None, description="Admin status")
    created_at: datetime = Field(..., description="Creation time")


class PaginatedAdminsOut(BaseModel):
    """Response schema for paginated admin list."""
    admins: List[AdminOut] = Field(..., description="List of admins")
    total: int = Field(..., description="Total number of admins")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Items per page")
    has_next: bool = Field(..., description="Whether there are next pages")
    has_prev: bool = Field(..., description="Whether there are previous pages")


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
