from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, health
from .routers.applications import apply, list_student, list_admin, list_all, update_status
from .routers.internships import create, list_public, search, admin_manage, owner_actions
from .routers.owner import dashboard, manage_admins, list_admins
from .routers.admin import dashboard as admin_dashboard, dashboard_cards, internships as admin_internships, applications as admin_applications

app = FastAPI(title="Internship Hub API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (development only)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# Include the new JWT auth router
app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])

# Include health check router
app.include_router(health.router, prefix="/api/v1", tags=["System"])

# Include Applications routers
app.include_router(apply.router, prefix="/api/v1", tags=["Applications"])
app.include_router(list_student.router, prefix="/api/v1", tags=["Applications"])
app.include_router(list_admin.router, prefix="/api/v1", tags=["Applications"])
app.include_router(list_all.router, prefix="/api/v1", tags=["Applications"])
app.include_router(update_status.router, prefix="/api/v1", tags=["Applications"])

# Include Internships routers
app.include_router(create.router, prefix="/api/v1", tags=["Internships"])
app.include_router(list_public.router, prefix="/api/v1", tags=["Internships"])
app.include_router(search.router, prefix="/api/v1", tags=["Internships"])
app.include_router(admin_manage.router, prefix="/api/v1", tags=["Internships"])
app.include_router(owner_actions.router, prefix="/api/v1", tags=["Owner"])

# Include Owner routers
app.include_router(dashboard.router, prefix="/api/v1", tags=["Owner"])
app.include_router(manage_admins.router, prefix="/api/v1", tags=["Owner"])
app.include_router(list_admins.router, prefix="/api/v1", tags=["Owner"])

# Include Admin routers
app.include_router(admin_dashboard.router, prefix="/api/v1", tags=["Admin"])
app.include_router(dashboard_cards.router, prefix="/api/v1", tags=["Admin"])
app.include_router(admin_internships.router, prefix="/api/v1", tags=["Admin"])
app.include_router(admin_applications.router, prefix="/api/v1", tags=["Admin"])
