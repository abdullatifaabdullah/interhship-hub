from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, validator
from passlib.hash import bcrypt
from ...db import fetchrow

router = APIRouter()

class SignInBody(BaseModel):
    email: str
    password: str
    
    @validator('email')
    def validate_email(cls, v):
        # Simple email validation for development
        if '@' not in v or '.' not in v.split('@')[1]:
            raise ValueError('Invalid email format')
        return v.lower()

@router.post("/signin")
async def signin(body: SignInBody):
    row = await fetchrow(
        "SELECT id, email, password_hash, role, admin_status FROM users WHERE email=$1",
        body.email.lower()
    )
    if not row:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Verify password using bcrypt
    if not bcrypt.verify(body.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "ok": True,
        "user": {
            "id": int(row["id"]),
            "email": row["email"],
            "role": row["role"],
            "admin_status": row["admin_status"]
        }
    }
