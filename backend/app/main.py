from fastapi import FastAPI
from .routers import auth, health
from .routers.applications import apply, list_student, list_admin, update_status
from .routers.internships import create, list_public, search, admin_manage, owner_actions
from .routers.owner import dashboard, manage_admins

app = FastAPI(title="Internship Hub API")

# Include the new JWT auth router
app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])

# Include health check router
app.include_router(health.router, prefix="/api/v1", tags=["System"])

# Include Applications routers
app.include_router(apply.router, prefix="/api/v1", tags=["Applications"])
app.include_router(list_student.router, prefix="/api/v1", tags=["Applications"])
app.include_router(list_admin.router, prefix="/api/v1", tags=["Applications"])
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
