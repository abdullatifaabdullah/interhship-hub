"""
GET /internships/approved - Public list of approved internships
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from ...schemas.internships import PaginatedInternshipsOut, InternshipOut
from ...db import fetch, fetchval
from typing import Optional

router = APIRouter()


@router.get("/internships/approved", response_model=PaginatedInternshipsOut)
async def get_approved_internships(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
    q: Optional[str] = Query(None, description="Search query for title/company"),
    location: Optional[str] = Query(None, description="Filter by location"),
    tags: Optional[str] = Query(None, description="Comma-separated tags to filter by")
):
    """
    Get paginated list of approved internships with optional filters.
    
    Rules:
    - Only shows approved internships
    - Supports search by title/company (ILIKE)
    - Supports location filtering
    - Supports tag filtering (array contains)
    """
    offset = (page - 1) * per_page
    
    # Build WHERE clause dynamically
    where_conditions = ["status = 'approved'"]
    params = []
    param_count = 0
    
    if q:
        param_count += 1
        where_conditions.append(f"(title ILIKE ${param_count} OR description ILIKE ${param_count})")
        params.append(f"%{q}%")
    
    if location:
        param_count += 1
        where_conditions.append(f"location ILIKE ${param_count}")
        params.append(f"%{location}%")
    
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",") if tag.strip()]
        if tag_list:
            param_count += 1
            where_conditions.append(f"tags && ${param_count}")
            params.append(tag_list)
    
    where_clause = " AND ".join(where_conditions)
    
    # Get internships
    internships = await fetch(
        f"""
        SELECT id, title, description, status, owner_note, created_by, location, tags, created_at
        FROM internships
        WHERE {where_clause}
        ORDER BY created_at DESC
        LIMIT ${param_count + 1} OFFSET ${param_count + 2}
        """,
        *params, per_page, offset
    )
    
    # Get total count
    total = await fetchval(
        f"""
        SELECT COUNT(*)
        FROM internships
        WHERE {where_clause}
        """,
        *params
    )
    
    # Convert to response format
    internship_list = [
        InternshipOut(
            id=internship["id"],
            title=internship["title"],
            description=internship["description"],
            status=internship["status"],
            owner_note=internship["owner_note"],
            created_by=internship["created_by"],
            location=internship["location"],
            tags=internship["tags"] or [],
            created_at=internship["created_at"]
        )
        for internship in internships
    ]
    
    return PaginatedInternshipsOut(
        internships=internship_list,
        total=total,
        page=page,
        per_page=per_page,
        has_next=offset + per_page < total,
        has_prev=page > 1
    )
