from fastapi import FastAPI
from .routers import auth, health

app = FastAPI(title="Internship Hub API")

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(health.router, prefix="/api/v1", tags=["System"])
