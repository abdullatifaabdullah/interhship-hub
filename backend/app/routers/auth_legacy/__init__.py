# Auth endpoints
from . import signin
from fastapi import APIRouter

router = APIRouter()
router.include_router(signin.router)
