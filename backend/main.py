"""
Dadok (Dataset Doktor) - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pathlib import Path

# Load environment variables
load_dotenv()

# Import routers
from api.upload import router as upload_router
from api.analyse import router as analyse_router

# Create FastAPI app
app = FastAPI(
    title="Dadok API",
    description="Dataset Doktor - Automated data health diagnostic platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "./uploads")
Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)

# Include routers
app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(analyse_router, prefix="/api", tags=["Analysis"])

@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "service": "Dadok API",
        "status": "healthy",
        "version": "1.0.0",
        "message": "Dataset Doktor is ready to diagnose your data!"
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "upload_folder": UPLOAD_FOLDER,
        "max_file_size_mb": os.getenv("MAX_FILE_SIZE_MB", "50"),
        "environment": os.getenv("ENVIRONMENT", "development")
    }

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=debug
    )