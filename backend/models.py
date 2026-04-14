"""
Pydantic models for API request/response validation
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

# ==================== UPLOAD MODELS ====================

class UploadResponse(BaseModel):
    """Response after successful file upload"""
    dataset_id: str
    filename: str
    file_size: int
    upload_time: str
    auto_delete_at: str
    message: str

# ==================== ANALYSIS MODELS ====================

class ColumnInfo(BaseModel):
    """Column-level information"""
    name: str
    type: str
    missing_count: int
    missing_percentage: float
    unique_count: int
    unique_percentage: float
    most_common_values: Optional[List[Dict[str, Any]]] = None
    statistics: Optional[Dict[str, Any]] = None  # For numeric columns

class DataQualityIssue(BaseModel):
    """Individual data quality issue"""
    severity: str  # "low", "medium", "critical"
    category: str  # "missing_values", "duplicates", "type_errors", etc.
    title: str
    description: str
    affected_columns: Optional[List[str]] = None
    count: Optional[int] = None
    percentage: Optional[float] = None

class MetadataInfo(BaseModel):
    """Dataset metadata"""
    rows: int
    columns: int
    size: str  # Human-readable size (e.g., "2.3 MB")
    auto_delete_minutes: int

class AnalysisResponse(BaseModel):
    """Complete analysis report response"""
    dataset_id: str
    filename: str
    health_score: int
    score_label: str  # "Excellent", "Good", "Moderate", "Poor", "Critical"
    metadata: MetadataInfo
    columns: List[ColumnInfo]
    issues: List[DataQualityIssue]
    analyzed_at: str

# ==================== CLEANING MODELS ====================

class CleaningOperation(BaseModel):
    """Single cleaning operation to perform"""
    operation: str  # "remove_duplicates", "fill_missing", "fix_types", etc.
    column: Optional[str] = None
    strategy: Optional[str] = None  # "mean", "median", "mode", "ffill", "bfill"
    value: Optional[Any] = None

class CleaningRequest(BaseModel):
    """Request to clean a dataset"""
    dataset_id: str
    operations: List[CleaningOperation]

class CleaningResponse(BaseModel):
    """Response after cleaning operation"""
    dataset_id: str
    cleaned_dataset_id: str
    rows_before: int
    rows_after: int
    columns_before: int
    columns_after: int
    operations_applied: List[str]
    message: str

# ==================== DOWNLOAD MODELS ====================

class DownloadRequest(BaseModel):
    """Request to download a dataset"""
    dataset_id: str
    format: str = Field(default="csv", pattern="^(csv|xlsx|json)$")