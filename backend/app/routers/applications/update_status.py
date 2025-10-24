"""
PATCH /applications/{id} - Admin update application status
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.applications import ApplicationUpdateRequest, ApplicationOut
from ...core.auth import require_admin_active
from ...db import fetchrow, execute

router = APIRouter()


@router.patch("/applications/{application_id}", response_model=ApplicationOut)
async def update_application_status(
    application_id: int,
    request: ApplicationUpdateRequest,
    current_user: dict = Depends(require_admin_active)
):
    """
    Update application status by admin.
    
    Rules:
    - Only active admins can update
    - Must validate allowed statuses
    - Updates status_updated_at timestamp
    """
    # Validate status
    allowed_statuses = ["review", "interview_required", "info_required", "rejected"]
    if request.status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Allowed: {', '.join(allowed_statuses)}"
        )
    
    # Check if application exists and get internship info
    application = await fetchrow(
        """
        SELECT a.*, i.created_by as internship_creator
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE a.id = $1
        """,
        application_id
    )
    
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found"
        )
    
    # Check if admin owns the internship post
    if application["internship_creator"] != current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only update applications for your own posts"
        )
    
    # Update application status
    updated_application = await fetchrow(
        """
        UPDATE applications 
        SET status = $1, status_note = $2, contact_email = $3, status_updated_at = NOW()
        WHERE id = $4
        RETURNING id, user_id, internship_id, status, status_note, contact_email, status_updated_at, created_at
        """,
        request.status, request.status_note, request.contact_email, application_id
    )
    
    return ApplicationOut(**updated_application)
