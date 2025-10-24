"""
Pydantic schemas for authentication endpoints

This module defines request and response models for:
- Sign-in requests and responses
- Token refresh requests and responses
- User profile responses
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class SignInRequest(BaseModel):
    """Request schema for user sign-in."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=1, description="User password")


class RefreshTokenRequest(BaseModel):
    """Request schema for token refresh."""
    refresh_token: str = Field(..., min_length=1, description="Refresh token")


class TokenResponse(BaseModel):
    """Response schema for authentication tokens."""
    access_token: str = Field(..., description="JWT access token")
    refresh_token: str = Field(..., description="Refresh token")
    token_type: str = Field(default="bearer", description="Token type")
    expires_in: int = Field(..., description="Access token expiration time in seconds")


class UserProfile(BaseModel):
    """Response schema for user profile information."""
    id: int = Field(..., description="User ID")
    email: str = Field(..., description="User email")
    role: str = Field(..., description="User role")
    admin_status: Optional[bool] = Field(None, description="Admin status")


class SignOutRequest(BaseModel):
    """Request schema for sign-out."""
    refresh_token: str = Field(..., min_length=1, description="Refresh token to revoke")


class SignOutResponse(BaseModel):
    """Response schema for sign-out."""
    ok: bool = Field(default=True, description="Operation success status")


class SignUpAdminRequest(BaseModel):
    """Request schema for admin sign-up."""
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., min_length=8, description="Admin password (min 8 characters)")
    full_name: str = Field(..., min_length=2, description="Admin full name")


class SignUpStudentRequest(BaseModel):
    """Request schema for student sign-up."""
    email: EmailStr = Field(..., description="Student email address")
    password: str = Field(..., min_length=8, description="Student password (min 8 characters)")
    full_name: str = Field(..., min_length=2, description="Student full name")


class SignUpResponse(BaseModel):
    """Response schema for sign-up."""
    ok: bool = Field(default=True, description="Operation success status")
    message: str = Field(..., description="Success message")
    user_id: int = Field(..., description="Created user ID")