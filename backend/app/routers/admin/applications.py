"""
GET /admin/applications - Admin view all applications
GET /admin/internships/{internship_id}/applications - Admin view applications for specific internship
PATCH /admin/applications/{application_id}/status - Admin update application status
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from ...core.auth import require_admin_active
from ...db import fetch, fetchrow, execute

router = APIRouter()


class ApplicationOut(BaseModel):
    """Response schema for application."""
    application_id: int = Field(..., description="Application ID")
    student_id: int = Field(..., description="Student user ID")
    internship_id: int = Field(..., description="Internship ID")
    status: str = Field(..., description="Application status")
    status_note: Optional[str] = Field(None, description="Status note")
    contact_email: Optional[str] = Field(None, description="Contact email")
    created_at: datetime = Field(..., description="Application creation time")
    status_updated_at: Optional[datetime] = Field(None, description="Status update time")
    internship_title: str = Field(..., description="Internship title")
    internship_location: Optional[str] = Field(None, description="Internship location")
    applicant_name: str = Field(..., description="Applicant full name")
    applicant_email: str = Field(..., description="Applicant email")


class ApplicationSimpleOut(BaseModel):
    """Response schema for simple application (for specific internship)."""
    application_id: int = Field(..., description="Application ID")
    student_id: int = Field(..., description="Student user ID")
    status: str = Field(..., description="Application status")
    status_note: Optional[str] = Field(None, description="Status note")
    contact_email: Optional[str] = Field(None, description="Contact email")
    created_at: datetime = Field(..., description="Application creation time")
    status_updated_at: Optional[datetime] = Field(None, description="Status update time")


class ApplicationStatusUpdateRequest(BaseModel):
    """Request schema for updating application status."""
    status: str = Field(..., description="New application status")
    status_note: Optional[str] = Field(None, description="Status note")
    contact_email: Optional[str] = Field(None, description="Contact email")


@router.get("/admin/applications", response_model=List[ApplicationOut])
async def get_admin_applications(
    current_user: dict = Depends(require_admin_active)
):
    """
    Get all applications for admin's internships.
    
    Returns applications ordered by creation date (newest first).
    """
    admin_id = current_user["id"]
    
    # Get applications from view
    applications = await fetch(
        """
        SELECT * FROM v_admin_all_applications
        WHERE admin_id = $1
        ORDER BY created_at DESC
        """,
        admin_id
    )
    
    return [ApplicationOut(**app) for app in applications]


@router.get("/admin/internships/{internship_id}/applications", response_model=List[ApplicationSimpleOut])
async def get_internship_applications(
    internship_id: int,
    current_user: dict = Depends(require_admin_active)
):
    """
    Get applications for a specific internship created by the admin.
    
    Rules:
    - Only active admins can access
    - Can only view applications for own internships
    - Returns 404 if internship not found or not owned by admin
    """
    admin_id = current_user["id"]
    
    # Verify ownership of the internship
    internship = await fetchrow(
        "SELECT id, created_by FROM internships WHERE id = $1",
        internship_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    if internship["created_by"] != admin_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only view applications for your own internships"
        )
    
    # Get applications for this internship
    applications = await fetch(
        """
        SELECT 
            a.id AS application_id, 
            a.user_id AS student_id,
            a.status, 
            a.status_note, 
            a.contact_email,
            a.created_at, 
            a.status_updated_at
        FROM applications a
        JOIN internships i ON i.id = a.internship_id
        WHERE a.internship_id = $1
          AND i.created_by = $2
        ORDER BY a.created_at DESC
        """,
        internship_id, admin_id
    )
    
    return [ApplicationSimpleOut(**app) for app in applications]


@router.patch("/admin/applications/{application_id}/status", response_model=ApplicationSimpleOut)
async def update_application_status(
    application_id: int,
    request: ApplicationStatusUpdateRequest,
    current_user: dict = Depends(require_admin_active)
):
    """
    Update application status by admin.
    
    Rules:
    - Only active admins can update
    - Can only update applications for own internships
    - Must validate allowed statuses
    - Updates status_updated_at timestamp
    """
    admin_id = current_user["id"]
    
    # Validate status
    allowed_statuses = ["review", "interview_required", "info_required", "rejected"]
    if request.status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Allowed: {', '.join(allowed_statuses)}"
        )
    
    # Update application status with ownership check
    updated_application = await fetchrow(
        """
        UPDATE applications a
        SET status = $3,
            status_note = $4,
            contact_email = $5,
            status_updated_at = NOW()
        FROM internships i
        WHERE a.internship_id = i.id
          AND a.id = $1
          AND i.created_by = $2
          AND $3 IN ('review','interview_required','info_required','rejected')
        RETURNING a.id AS application_id, a.user_id AS student_id, a.status, 
                  a.status_note, a.contact_email, a.created_at, a.status_updated_at
        """,
        application_id, admin_id, request.status, request.status_note, request.contact_email
    )
    
    if not updated_application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found or you don't have permission to update it"
        )
    
    return ApplicationSimpleOut(**updated_application)
