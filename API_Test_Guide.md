# API Test Guide - Internship Hub

## Server Setup

### Starting the FastAPI Server

Navigate to the backend directory and run:

```bash
cd backend
uvicorn app.main:app --reload --port 5000
```

**Important**: 
- Make sure you're in the `backend` directory when running this command, otherwise you'll get a `ModuleNotFoundError: No module named 'app'`
- **Ports 8000 and 8080 may be occupied** by other processes. Use port 5000 for reliable startup

The server will start on `http://localhost:5000` with auto-reload enabled.

## Authentication Endpoint Testing

### Sign-In Endpoint

**URL**: `http://localhost:5000/api/v1/auth/signin`

### Postman Setup

1. **Method**: `POST`
2. **URL**: `http://localhost:5000/api/v1/auth/signin`
3. **Headers**:
   ```
   Content-Type: application/json
   ```
4. **Body** (raw JSON):
   ```json
   {
     "email": "owner@hub.local",
     "password": "Owner@123!"
   }
   ```

### Expected Responses

#### ✅ Success (200 OK)
```json
{
  "ok": true,
  "user": {
    "id": 1,
    "email": "owner@hub.local",
    "role": "owner",
    "admin_status": null
  }
}
```

#### ❌ Invalid Credentials (401 Unauthorized)
```json
{
  "detail": "Invalid credentials"
}
```

### Test Cases

1. **Valid credentials**: Use existing user email/password from your database
2. **Invalid email**: Use non-existent email
3. **Invalid password**: Use correct email but wrong password
4. **Malformed email**: Test email validation

## Postman Troubleshooting

### Common Postman Issues

#### 1. **Connection Refused Error**
```
Error: connect ECONNREFUSED 127.0.0.1:5000
```
**Solutions:**
- ✅ **MUST use port 5000** in both server and Postman
- ✅ Ensure server is running: `uvicorn app.main:app --reload --port 5000`
- ✅ Check you're in the `backend` directory when starting server

#### 2. **Wrong URL Format**
❌ **Wrong**: `http://localhost:5000/auth/signin`  
✅ **Correct**: `http://localhost:5000/api/v1/auth/signin`

#### 3. **Missing Headers**
❌ **Missing**: No `Content-Type` header  
✅ **Required**: `Content-Type: application/json`

#### 4. **Wrong Request Method**
❌ **Wrong**: GET request  
✅ **Correct**: POST request

#### 5. **Malformed JSON Body**
❌ **Wrong**:
```json
{
  email: "test@example.com",
  password: "password123"
}
```
✅ **Correct**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Step-by-Step Postman Setup

1. **Create New Request**
   - Click "New" → "HTTP Request"

2. **Set Method & URL**
   - Method: `POST`
   - URL: `http://localhost:5000/api/v1/auth/signin`

3. **Add Headers**
   - Go to "Headers" tab
   - Key: `Content-Type`
   - Value: `application/json`

4. **Set Body**
   - Go to "Body" tab
   - Select "raw"
   - Choose "JSON" from dropdown
   - Enter:
   ```json
   {
     "email": "owner@hub.local",
     "password": "Owner@123!"
   }
   ```

5. **Send Request**
   - Click "Send"
   - Expect 200 OK with user data, or 401 with "Invalid credentials"

## Troubleshooting

### Common Connection Issues

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5000`

**Causes & Solutions**:
- **Server not running**: Start the server with `uvicorn app.main:app --reload --port 5000`
- **Wrong port**: **MUST use port 5000** - ports 8000 and 8080 are typically occupied
- **Wrong directory**: Make sure you're running uvicorn from the `backend` directory
- **Port conflicts**: If port 5000 fails, try ports 3000, 4000, or 6000

### Port Configuration

- **✅ WORKING PORT**: 5000 (use this for reliable connection)
- **❌ AVOID**: Ports 8000 and 8080 (commonly occupied by other processes)
- **Alternative ports**: If 5000 fails, try 3000, 4000, or 6000

### Database Requirements

Ensure your PostgreSQL database has:
- Users table with bcrypt-hashed passwords in `password_hash` column
- At least one test user for authentication testing

## Security Notes

- Passwords are verified using bcrypt (via `passlib.hash.bcrypt`)
- Email addresses are automatically converted to lowercase
- Invalid credentials return generic "Invalid credentials" message (no user enumeration)
- Password verification is secure against timing attacks
