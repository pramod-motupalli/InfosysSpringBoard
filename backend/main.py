# FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import vegetation, soil, health
from .utils.settings import settings


app = FastAPI(title="Veg+Soil Inference API")


app.add_middleware(
CORSMiddleware,
allow_origins=["*"] if settings.CORS_ALLOW_ORIGINS == "*" else settings.CORS_ALLOW_ORIGINS.split(","),
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)


app.include_router(health.router)
app.include_router(vegetation.router)
app.include_router(soil.router)

