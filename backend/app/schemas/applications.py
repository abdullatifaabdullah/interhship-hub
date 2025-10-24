"""
Pydantic schemas for application endpoints
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ApplicationCreateRequest(BaseModel):
    """Request schema for creating an application."""
    internship_id: int = Field(..., description="ID of the internship to apply for")


class ApplicationUpdateRequest(BaseModel):
    """Request schema for updating application status."""
    status: str = Field(..., description="New application status")
    status_note: Optional[str] = Field(None, description="Optional note about status change")
    contact_email: Optional[str] = Field(None, description="Contact email for applicant")


class ApplicationOut(BaseModel):
    """Response schema for application data."""
    id: int = Field(..., description="Application ID")
    user_id: int = Field(..., description="User ID")
    internship_id: int = Field(..., description="Internship ID")
    status: str = Field(..., description="Application status")
    status_note: Optional[str] = Field(None, description="Status note")
    contact_email: Optional[str] = Field(None, description="Contact email")
    status_updated_at: Optional[datetime] = Field(None, description="Last status update time")
    created_at: datetime = Field(..., description="Application creation time")


class ApplicationWithInternshipOut(BaseModel):
    """Response schema for application with internship details."""
    id: int = Field(..., description="Application ID")
    user_id: int = Field(..., description="User ID")
    internship_id: int = Field(..., description="Internship ID")
    status: str = Field(..., description="Application status")
    status_note: Optional[str] = Field(None, description="Status note")
    contact_email: Optional[str] = Field(None, description="Contact email")
    status_updated_at: Optional[datetime] = Field(None, description="Last status update time")
    created_at: datetime = Field(..., description="Application creation time")
    internship_title: str = Field(..., description="Internship title")
    internship_company: Optional[str] = Field(None, description="Company name")
    internship_location: Optional[str] = Field(None, description="Internship location")


class PaginatedApplicationsOut(BaseModel):
    """Response schema for paginated applications list."""
    applications: list[ApplicationWithInternshipOut] = Field(..., description="List of applications")
    total: int = Field(..., description="Total number of applications")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    has_next: bool = Field(..., description="Whether there are more pages")
    has_prev: bool = Field(..., description="Whether there are previous pages")
