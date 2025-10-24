"""
GET /internships/search - Alias for approved internships with filters
"""

from fastapi import APIRouter
from .list_public import get_approved_internships

router = APIRouter()

# Alias endpoint - same behavior as approved list
router.get("/internships/search")(get_approved_internships)
