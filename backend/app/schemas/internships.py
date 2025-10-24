"""
Pydantic schemas for internship endpoints
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class InternshipCreateRequest(BaseModel):
    """Request schema for creating an internship."""
    title: str = Field(..., min_length=1, description="Internship title")
    description: str = Field(..., min_length=1, description="Internship description")
    location: Optional[str] = Field(None, description="Internship location")
    tags: Optional[List[str]] = Field(default_factory=list, description="Internship tags")


class InternshipRejectRequest(BaseModel):
    """Request schema for rejecting an internship."""
    reason: str = Field(..., min_length=1, description="Reason for rejection")


class InternshipOut(BaseModel):
    """Response schema for internship data."""
    id: int = Field(..., description="Internship ID")
    title: str = Field(..., description="Internship title")
    description: str = Field(..., description="Internship description")
    status: str = Field(..., description="Internship status")
    owner_note: Optional[str] = Field(None, description="Owner note")
    created_by: int = Field(..., description="Creator user ID")
    location: Optional[str] = Field(None, description="Internship location")
    tags: List[str] = Field(default_factory=list, description="Internship tags")
    created_at: datetime = Field(..., description="Creation time")


class InternshipCreateOut(BaseModel):
    """Response schema for internship creation."""
    id: int = Field(..., description="Internship ID")
    status: str = Field(..., description="Internship status")
    created_at: datetime = Field(..., description="Creation time")


class PaginatedInternshipsOut(BaseModel):
    """Response schema for paginated internships list."""
    internships: List[InternshipOut] = Field(..., description="List of internships")
    total: int = Field(..., description="Total number of internships")
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Number of items per page")
    has_next: bool = Field(..., description="Whether there are more pages")
    has_prev: bool = Field(..., description="Whether there are previous pages")
