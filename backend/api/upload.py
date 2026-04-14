"""
Upload API Endpoint - Handle file uploads
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import os
import uuid
from datetime import datetime, timedelta
from dotenv import load_dotenv
import shutil

load_dotenv()

router = APIRouter()

# Configuration
UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "./uploads")
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 50))
ALLOWED_EXTENSIONS = os.getenv("ALLOWED_EXTENSIONS", "csv,xlsx,json").split(",")
AUTO_DELETE_MINUTES = int(os.getenv("AUTO_DELETE_MINUTES", 30))

# In-memory storage for dataset metadata (replace with database later)
dataset_storage = {}

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Upload a dataset file for analysis
    
    Args:
        file: Uploaded file (CSV, XLSX, or JSON)
    
    Returns:
        Upload confirmation with dataset_id and metadata
    
    Raises:
        HTTPException: If file is invalid or too large
    """
    
    # Validate file extension
    file_extension = Path(file.filename).suffix.lower().replace(".", "")
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Generate unique dataset ID
    dataset_id = str(uuid.uuid4())
    
    # Create upload directory if it doesn't exist
    Path(UPLOAD_FOLDER).mkdir(parents=True, exist_ok=True)
    
    # Save file with unique name
    file_path = Path(UPLOAD_FOLDER) / f"{dataset_id}.{file_extension}"
    
    try:
        # Read file content
        file_content = await file.read()
        file_size = len(file_content)
        
        # Validate file size
        max_size_bytes = MAX_FILE_SIZE_MB * 1024 * 1024
        if file_size > max_size_bytes:
            raise HTTPException(
                status_code=400,
                detail=f"File too large. Maximum size: {MAX_FILE_SIZE_MB}MB"
            )
        
        # Save file to disk
        with open(file_path, "wb") as f:
            f.write(file_content)
        
        # Calculate auto-delete time
        upload_time = datetime.now()
        auto_delete_at = upload_time + timedelta(minutes=AUTO_DELETE_MINUTES)
        
        # Store metadata in memory (will be replaced with database)
        dataset_storage[dataset_id] = {
            "filename": file.filename,
            "file_path": str(file_path),
            "file_size": file_size,
            "file_extension": file_extension,
            "upload_time": upload_time.isoformat(),
            "auto_delete_at": auto_delete_at.isoformat(),
            "status": "uploaded"
        }
        
        # Format file size for response
        if file_size < 1024:
            size_str = f"{file_size} B"
        elif file_size < 1024 * 1024:
            size_str = f"{file_size / 1024:.2f} KB"
        else:
            size_str = f"{file_size / (1024 * 1024):.2f} MB"
        
        return {
            "dataset_id": dataset_id,
            "filename": file.filename,
            "file_size": file_size,
            "size_str": size_str,
            "upload_time": upload_time.isoformat(),
            "auto_delete_at": auto_delete_at.isoformat(),
            "auto_delete_minutes": AUTO_DELETE_MINUTES,
            "message": "File uploaded successfully. Ready for analysis."
        }
        
    except HTTPException:
        # Clean up file if validation failed
        if file_path.exists():
            file_path.unlink()
        raise
    
    except Exception as e:
        # Clean up file on error
        if file_path.exists():
            file_path.unlink()
        
        raise HTTPException(
            status_code=500,
            detail=f"Failed to upload file: {str(e)}"
        )

@router.get("/datasets/{dataset_id}")
async def get_dataset_info(dataset_id: str):
    """
    Get metadata for an uploaded dataset
    
    Args:
        dataset_id: Unique dataset identifier
    
    Returns:
        Dataset metadata
    
    Raises:
        HTTPException: If dataset not found
    """
    if dataset_id not in dataset_storage:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found or has been deleted"
        )
    
    return dataset_storage[dataset_id]

@router.delete("/datasets/{dataset_id}")
async def delete_dataset(dataset_id: str):
    """
    Manually delete a dataset before auto-delete timer
    
    Args:
        dataset_id: Unique dataset identifier
    
    Returns:
        Deletion confirmation
    
    Raises:
        HTTPException: If dataset not found
    """
    if dataset_id not in dataset_storage:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )
    
    # Get file path and delete file
    dataset_info = dataset_storage[dataset_id]
    file_path = Path(dataset_info["file_path"])
    
    if file_path.exists():
        file_path.unlink()
    
    # Remove from storage
    del dataset_storage[dataset_id]
    
    return {
        "message": "Dataset deleted successfully",
        "dataset_id": dataset_id
    }