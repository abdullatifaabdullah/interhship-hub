"""
DELETE /internships/{id} - Admin delete own internship post
"""

from fastapi import APIRouter, Depends, HTTPException, status
from ...core.auth import require_admin_active
from ...db import fetchrow, execute

router = APIRouter()


@router.delete("/internships/{internship_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_internship(
    internship_id: int,
    current_user: dict = Depends(require_admin_active)
):
    """
    Delete an internship post.
    
    Rules:
    - Only active admins can delete
    - Can only delete own posts (created_by = current_admin_id)
    - Returns 204 on success
    """
    # Check if internship exists and get creator info
    internship = await fetchrow(
        "SELECT id, created_by FROM internships WHERE id = $1",
        internship_id
    )
    
    if not internship:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Internship not found"
        )
    
    # Check ownership
    if internship["created_by"] != current_user["id"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Can only delete your own internship posts"
        )
    
    # Delete the internship (CASCADE will handle applications)
    await execute(
        "DELETE FROM internships WHERE id = $1",
        internship_id
    )
