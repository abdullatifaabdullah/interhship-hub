"""
POST /applications - Student apply for internship
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.applications import ApplicationCreateRequest, ApplicationOut
from ...core.auth import require_student
from ...db import fetchrow, execute

router = APIRouter()


@router.post("/applications", response_model=ApplicationOut, status_code=status.HTTP_201_CREATED)
async def create_application(
    request: ApplicationCreateRequest,
    current_user: dict = Depends(require_student)
):
    """
    Create a new application for an internship.
    
    Rules:
    - Only students can apply
    - Target internship must be approved
    - One application per (student, internship) pair
    """
    # Check if internship exists and is approved
    internship = await fetchrow(
        "SELECT id, status FROM internships WHERE id = $1",
        request.internship_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    if internship["status"] != "approved":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only apply to approved internships"
        )
    
    # Check for existing application
    existing = await fetchrow(
        "SELECT id FROM applications WHERE user_id = $1 AND internship_id = $2",
        current_user["id"], request.internship_id
    )
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Application already exists for this internship"
        )
    
    # Create application
    application = await fetchrow(
        """
        INSERT INTO applications (user_id, internship_id, status)
        VALUES ($1, $2, 'submitted')
        RETURNING id, user_id, internship_id, status, status_note, contact_email, status_updated_at, created_at
        """,
        current_user["id"], request.internship_id
    )
    
    return ApplicationOut(**application)
