"""
GET /applications/for-admin - Admin view applicants for their posts
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from ...schemas.applications import PaginatedApplicationsOut, ApplicationWithInternshipOut
from ...core.auth import require_admin_active
from ...db import fetch, fetchval, fetchrow

router = APIRouter()


@router.get("/applications/for-admin", response_model=PaginatedApplicationsOut)
async def get_applications_for_admin(
    post_id: int = Query(..., description="Internship post ID"),
    current_user: dict = Depends(require_admin_active),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page")
):
    """
    Get paginated list of applicants for one of admin's internship posts.
    Enforces ownership by created_by.
    """
    # Verify ownership of the internship post
    internship = await fetchrow(
        "SELECT id, created_by FROM internships WHERE id = $1",
        post_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship post not found"
        )
    
    if internship["created_by"] != current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only view applicants for your own posts"
        )
    
    offset = (page - 1) * per_page
    
    # Get applications for this internship
    applications = await fetch(
        """
        SELECT 
            a.id, a.user_id, a.internship_id, a.status, a.status_note, 
            a.contact_email, a.status_updated_at, a.created_at,
            i.title as internship_title, i.location as internship_location,
            u.full_name as applicant_name, u.email as applicant_email
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        JOIN users u ON a.user_id = u.id
        WHERE a.internship_id = $1
        ORDER BY a.created_at DESC
        LIMIT $2 OFFSET $3
        """,
        post_id, per_page, offset
    )
    
    # Get total count
    total = await fetchval(
        "SELECT COUNT(*) FROM applications WHERE internship_id = $1",
        post_id
    )
    
    # Convert to response format
    application_list = [
        ApplicationWithInternshipOut(
            id=app["id"],
            user_id=app["user_id"],
            internship_id=app["internship_id"],
            status=app["status"],
            status_note=app["status_note"],
            contact_email=app["contact_email"],
            status_updated_at=app["status_updated_at"],
            created_at=app["created_at"],
            internship_title=app["internship_title"],
            internship_company=None,  # Not in schema yet
            internship_location=app["internship_location"]
        )
        for app in applications
    ]
    
    return PaginatedApplicationsOut(
        applications=application_list,
        total=total,
        page=page,
        per_page=per_page,
        has_next=offset + per_page < total,
        has_prev=page > 1
    )
