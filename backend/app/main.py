from fastapi import FastAPI
from .routers import auth, health

app = FastAPI(title="Internship Hub API")

# Include the new JWT auth router
app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])

# Include health check router
app.include_router(health.router, prefix="/api/v1", tags=["System"])
