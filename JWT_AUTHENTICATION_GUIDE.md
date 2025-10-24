# JWT Authentication System - Setup and Testing Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Database Setup
Run the database migrations to create the refresh_tokens table:
```sql
-- Run this SQL in your PostgreSQL database
\i db/migrations/001_create_refresh_tokens.sql
\i db/schema.sql
\i db/seed.sql
```

### 3. Start the Server
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

The server will run on `http://localhost:5000`

## 🔐 Authentication Endpoints

### POST /api/v1/auth/sign-in
**Sign in with email and password**

**Request:**
```json
{
  "email": "owner@hub.com",
  "password": "Owner@123!"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "abc123def456...",
  "token_type": "bearer",
  "expires_in": 900
}
```

### POST /api/v1/auth/refresh
**Refresh access token using refresh token**

**Request:**
```json
{
  "refresh_token": "abc123def456..."
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "xyz789uvw012...",
  "token_type": "bearer",
  "expires_in": 900
}
```

### POST /api/v1/auth/sign-out
**Revoke refresh token**

**Request:**
```json
{
  "refresh_token": "xyz789uvw012..."
}
```

**Response:**
```json
{
  "ok": true
}
```

### GET /api/v1/auth/me
**Get current user profile (requires authentication)**

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "id": 1,
  "email": "owner@hub.com",
  "role": "owner",
  "admin_status": null
}
```

## 🧪 Testing with Postman

### Environment Variables
Create a Postman environment with:
- `baseUrl`: `http://localhost:5000`
- `access_token`: (will be set automatically)
- `refresh_token`: (will be set automatically)

### Test Flow

1. **Sign In**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/v1/auth/sign-in`
   - Body (JSON):
     ```json
     {
       "email": "owner@hub.com",
       "password": "Owner@123!"
     }
     ```
   - Save `access_token` and `refresh_token` to environment variables

2. **Get Profile**
   - Method: `GET`
   - URL: `{{baseUrl}}/api/v1/auth/me`
   - Headers: `Authorization: Bearer {{access_token}}`

3. **Refresh Tokens**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/v1/auth/refresh`
   - Body (JSON):
     ```json
     {
       "refresh_token": "{{refresh_token}}"
     }
     ```
   - Update environment variables with new tokens

4. **Sign Out**
   - Method: `POST`
   - URL: `{{baseUrl}}/api/v1/auth/sign-out`
   - Body (JSON):
     ```json
     {
       "refresh_token": "{{refresh_token}}"
     }
     ```

## 👥 Test Users

| Email | Password | Role | Admin Status |
|-------|----------|------|--------------|
| `owner@hub.com` | `Owner@123!` | owner | null |
| `admin@hub.com` | `Admin@123!` | admin | active |
| `student@hub.com` | `Student@123!` | student | null |

## 🔒 Security Features

- **Access Tokens**: JWT tokens with 15-minute expiration
- **Refresh Tokens**: 7-day expiration with rotation on each use
- **Token Storage**: Only SHA-256 hashes stored in database
- **Password Security**: bcrypt hashing with salt
- **Token Rotation**: Old refresh tokens are revoked when new ones are issued

## 🛠️ Using Authentication in Your Routes

### Protect a Route
```python
from fastapi import Depends
from app.core.auth import get_current_user

@router.get("/protected")
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {"user": current_user}
```

### Role-Based Access Control
```python
from app.core.auth import require_admin, require_owner, require_student

@router.get("/admin-only")
async def admin_route(admin_user: dict = Depends(require_admin)):
    return {"message": "Admin access granted"}

@router.get("/owner-only")
async def owner_route(owner_user: dict = Depends(require_owner)):
    return {"message": "Owner access granted"}
```

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid credentials"**
   - Check email/password combination
   - Ensure user exists in database

2. **"Could not validate credentials"**
   - Access token expired (15 minutes)
   - Invalid or malformed token
   - Use refresh endpoint to get new token

3. **"Invalid refresh token"**
   - Refresh token expired (7 days)
   - Token already revoked
   - User needs to sign in again

4. **Database Connection Issues**
   - Check PostgreSQL is running
   - Verify database credentials in config
   - Ensure refresh_tokens table exists

### Debug Mode
Set environment variables for debugging:
```bash
export JWT_SECRET="your-secret-key"
export ACCESS_TOKEN_MIN="15"
export REFRESH_TOKEN_DAYS="7"
```

## 📝 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:5000/docs`
- **ReDoc**: `http://localhost:5000/redoc`

The authentication endpoints will be documented with request/response schemas and examples.
