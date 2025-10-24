"""
POST /internships - Admin create internship post
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.internships import InternshipCreateRequest, InternshipCreateOut
from ...core.auth import require_admin_active
from ...db import fetchrow

router = APIRouter()


@router.post("/internships", response_model=InternshipCreateOut, status_code=status.HTTP_201_CREATED)
async def create_internship(
    request: InternshipCreateRequest,
    current_user: dict = Depends(require_admin_active)
):
    """
    Create a new internship post.
    
    Rules:
    - Only active admins can create
    - Status starts as 'pending_approval'
    - Owner must approve before it becomes public
    """
    # Create internship with pending_approval status
    internship = await fetchrow(
        """
        INSERT INTO internships (title, description, status, created_by, location, tags)
        VALUES ($1, $2, 'pending_approval', $3, $4, $5)
        RETURNING id, status, created_at
        """,
        request.title, request.description, current_user["id"], 
        request.location, request.tags or []
    )
    
    return InternshipCreateOut(**internship)
