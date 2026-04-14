"""
Analysis API Endpoint - Analyze datasets and generate health reports
"""

from fastapi import APIRouter, HTTPException
from pathlib import Path
from datetime import datetime
import os
from dotenv import load_dotenv

# Import processing modules
import sys
sys.path.append(str(Path(__file__).parent.parent))

from processing.profiler import DatasetProfiler, load_dataset
from processing.validator import DataQualityValidator
from api.upload import dataset_storage

load_dotenv()

router = APIRouter()

# Configuration
AUTO_DELETE_MINUTES = int(os.getenv("AUTO_DELETE_MINUTES", 30))

@router.post("/analyze/{dataset_id}")
async def analyze_dataset(dataset_id: str):
    """
    Analyze an uploaded dataset and generate health report
    
    Args:
        dataset_id: Unique dataset identifier
    
    Returns:
        Complete analysis report with health score, issues, and column info
    
    Raises:
        HTTPException: If dataset not found or analysis fails
    """
    
    # Check if dataset exists
    if dataset_id not in dataset_storage:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found. Please upload a dataset first."
        )
    
    dataset_info = dataset_storage[dataset_id]
    file_path = dataset_info["file_path"]
    
    # Check if file exists on disk
    if not Path(file_path).exists():
        raise HTTPException(
            status_code=404,
            detail="Dataset file not found on server"
        )
    
    try:
        # Load dataset
        df = load_dataset(file_path)
        
        # Validate dataset size limits
        max_rows = int(os.getenv("MAX_ROWS", 1000000))
        max_columns = int(os.getenv("MAX_COLUMNS", 200))
        
        if len(df) > max_rows:
            raise HTTPException(
                status_code=400,
                detail=f"Dataset too large. Maximum {max_rows:,} rows allowed."
            )
        
        if len(df.columns) > max_columns:
            raise HTTPException(
                status_code=400,
                detail=f"Too many columns. Maximum {max_columns} columns allowed."
            )
        
        # Profile dataset
        profiler = DatasetProfiler(df)
        profile = profiler.profile_dataset()
        
        # Validate data quality and calculate health score
        validator = DataQualityValidator(df, profile)
        validation_results = validator.validate()
        
        # Format file size
        file_size_bytes = dataset_info["file_size"]
        if file_size_bytes < 1024:
            size_str = f"{file_size_bytes} B"
        elif file_size_bytes < 1024 * 1024:
            size_str = f"{file_size_bytes / 1024:.1f} KB"
        else:
            size_str = f"{file_size_bytes / (1024 * 1024):.1f} MB"
        
        # Build response matching frontend Report.jsx structure
        response = {
            "dataset_id": dataset_id,
            "filename": dataset_info["filename"],
            "health_score": validation_results["health_score"],
            "score_label": validation_results["score_label"],
            "metadata": {
                "rows": profile["metadata"]["rows"],
                "columns": profile["metadata"]["columns"],
                "size": size_str,
                "auto_delete_minutes": AUTO_DELETE_MINUTES
            },
            "columns": profile["columns"],
            "issues": validation_results["issues"],
            "duplicates": profile["duplicates"],
            "missing_values": profile["missing_values"],
            "analyzed_at": datetime.now().isoformat()
        }
        
        # Update dataset status in storage
        dataset_storage[dataset_id]["status"] = "analyzed"
        dataset_storage[dataset_id]["analysis"] = response
        
        return response
        
    except HTTPException:
        raise
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )

@router.get("/report/{dataset_id}")
async def get_analysis_report(dataset_id: str):
    """
    Retrieve previously generated analysis report
    
    Args:
        dataset_id: Unique dataset identifier
    
    Returns:
        Analysis report if already analyzed
    
    Raises:
        HTTPException: If dataset not found or not yet analyzed
    """
    
    if dataset_id not in dataset_storage:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found"
        )
    
    dataset_info = dataset_storage[dataset_id]
    
    if dataset_info.get("status") != "analyzed":
        raise HTTPException(
            status_code=400,
            detail="Dataset has not been analyzed yet. Call /api/analyze/{dataset_id} first."
        )
    
    return dataset_info.get("analysis", {})