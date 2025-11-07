import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # load backend/.env
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    API_PREFIX: str = "/api"
    CORS_ALLOW_ORIGINS: str = "*"

    # sensible defaults (won’t be used if .env is set)
    VEG_MODEL_PATH: str = "./backend/models/VegSegModel_v1.pt"
    SOIL_MODEL_PATH: str = "./backend/models/SoilDetectionModel.pt"

    PORT: int = 8000
    LOG_LEVEL: str = "info"

settings = Settings()
