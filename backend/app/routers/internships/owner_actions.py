"""
PATCH /owner/internships/{id}/approve - Owner approve internship
PATCH /owner/internships/{id}/reject - Owner reject internship
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.internships import InternshipRejectRequest
from ...schemas.owner import InternshipStatusUpdateOut
from ...core.auth import require_owner
from ...db import fetchrow

router = APIRouter()


@router.patch("/owner/internships/{internship_id}/approve", response_model=InternshipStatusUpdateOut)
async def approve_internship(
    internship_id: int,
    current_user: dict = Depends(require_owner)
):
    """
    Approve an internship post.
    
    Rules:
    - Only owner can approve
    - Sets status to 'approved'
    """
    # Check if internship exists
    internship = await fetchrow(
        "SELECT id FROM internships WHERE id = $1",
        internship_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    # Update status to approved
    updated_internship = await fetchrow(
        """
        UPDATE internships 
        SET status = 'approved'
        WHERE id = $1
        RETURNING id, status
        """,
        internship_id
    )
    
    return InternshipStatusUpdateOut(**updated_internship)


@router.patch("/owner/internships/{internship_id}/reject", response_model=InternshipStatusUpdateOut)
async def reject_internship(
    internship_id: int,
    request: InternshipRejectRequest,
    current_user: dict = Depends(require_owner)
):
    """
    Reject an internship post.
    
    Rules:
    - Only owner can reject
    - Sets status to 'rejected'
    - Stores rejection reason in owner_note
    """
    # Check if internship exists
    internship = await fetchrow(
        "SELECT id FROM internships WHERE id = $1",
        internship_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    # Update status to rejected with reason
    updated_internship = await fetchrow(
        """
        UPDATE internships 
        SET status = 'rejected', owner_note = $1
        WHERE id = $2
        RETURNING id, status
        """,
        request.reason, internship_id
    )
    
    return InternshipStatusUpdateOut(**updated_internship)
