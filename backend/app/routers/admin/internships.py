"""
GET /admin/internships - Admin manage internships
DELETE /admin/internships/{internship_id} - Admin delete internship
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from ...core.auth import require_admin_active
from ...db import fetch, fetchrow, execute

router = APIRouter()


class InternshipWithCountsOut(BaseModel):
    """Response schema for internship with application counts."""
    id: int = Field(..., description="Internship ID")
    title: str = Field(..., description="Internship title")
    description: str = Field(..., description="Internship description")
    status: str = Field(..., description="Internship status")
    location: Optional[str] = Field(None, description="Internship location")
    tags: List[str] = Field(default_factory=list, description="Internship tags")
    created_at: datetime = Field(..., description="Creation timestamp")
    admin_id: int = Field(..., description="Admin who created the internship")
    application_count: int = Field(..., description="Total application count")
    pending_count: int = Field(..., description="Pending application count")
    approved_count: int = Field(..., description="Approved application count")
    rejected_count: int = Field(..., description="Rejected application count")


@router.get("/admin/internships", response_model=List[InternshipWithCountsOut])
async def get_admin_internships(
    current_user: dict = Depends(require_admin_active)
):
    """
    Get all internships created by the admin with application counts.
    
    Returns internships ordered by creation date (newest first).
    """
    admin_id = current_user["id"]
    
    # Get internships with counts from view
    internships = await fetch(
        """
        SELECT * FROM v_admin_internships_with_counts
        WHERE admin_id = $1
        ORDER BY created_at DESC
        """,
        admin_id
    )
    
    return [InternshipWithCountsOut(**internship) for internship in internships]


@router.delete("/admin/internships/{internship_id}")
async def delete_internship(
    internship_id: int,
    current_user: dict = Depends(require_admin_active)
):
    """
    Delete an internship created by the admin.
    
    Rules:
    - Only active admins can delete
    - Can only delete own internships
    - Returns 404 if internship not found or not owned by admin
    """
    admin_id = current_user["id"]
    
    # Delete internship and check ownership
    result = await execute(
        """
        DELETE FROM internships
        WHERE id = $1 AND created_by = $2
        RETURNING id
        """,
        internship_id, admin_id
    )
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found or you don't have permission to delete it"
        )
    
    return {"message": "Internship deleted successfully", "id": internship_id}
