from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.auth import router as auth_router
from app.api.routes.me import router as me_router
from app.api.routes.restaurant import router as restaurant_router
from app.api.routes.tables import router as tables_router
from app.api.routes.menu import router as menu_router
from app.api.routes.orders import router as orders_router
from app.api.routes.payments import router as payments_router
from app.api.routes.staff import router as staff_router
from app.api.routes.reports import router as reports_router
from app.api.routes.audit import router as audit_router


app = FastAPI(
    title="RestaurantOS API",
    description="Restaurant QR Ordering & Management SaaS API",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(me_router)
app.include_router(restaurant_router)
app.include_router(tables_router)
app.include_router(menu_router)
app.include_router(orders_router)
app.include_router(payments_router)
app.include_router(staff_router)
app.include_router(reports_router)
app.include_router(audit_router)


@app.get("/")
def root():
    return {
        "service": "RestaurantOS API",
        "version": "0.1.0",
        "status": "running",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
    }