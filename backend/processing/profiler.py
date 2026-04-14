"""
Dataset Profiler - Extracts metadata and statistics from datasets
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional
from pathlib import Path

class DatasetProfiler:
    """
    Profiles datasets to extract comprehensive metadata and statistics
    """
    
    def __init__(self, df: pd.DataFrame):
        self.df = df
        self.profile = {}
    
    def profile_dataset(self) -> Dict[str, Any]:
        """
        Generate complete dataset profile
        
        Returns:
            Dictionary containing all profiling information
        """
        self.profile = {
            "metadata": self._get_metadata(),
            "columns": self._profile_columns(),
            "duplicates": self._check_duplicates(),
            "missing_values": self._analyze_missing_values(),
        }
        
        return self.profile
    
    def _get_metadata(self) -> Dict[str, Any]:
        """Extract basic dataset metadata"""
        memory_usage = self.df.memory_usage(deep=True).sum()
        
        return {
            "rows": len(self.df),
            "columns": len(self.df.columns),
            "memory_bytes": int(memory_usage),
            "memory_mb": round(memory_usage / (1024 * 1024), 2),
        }
    
    def _profile_columns(self) -> List[Dict[str, Any]]:
        """Profile each column with statistics"""
        columns_info = []
        
        for col in self.df.columns:
            col_data = self.df[col]
            col_info = {
                "name": col,
                "type": self._infer_type(col_data),
                "missing_count": int(col_data.isna().sum()),
                "missing_percentage": round((col_data.isna().sum() / len(col_data)) * 100, 2),
                "unique_count": int(col_data.nunique()),
                "unique_percentage": round((col_data.nunique() / len(col_data)) * 100, 2),
            }
            
            # Add most common values
            if col_data.dtype == 'object' or col_data.dtype.name == 'category':
                col_info["most_common_values"] = self._get_most_common(col_data, top_n=5)
            
            # Add statistics for numeric columns
            if pd.api.types.is_numeric_dtype(col_data):
                col_info["statistics"] = self._get_numeric_stats(col_data)
            
            columns_info.append(col_info)
        
        return columns_info
    
    def _infer_type(self, series: pd.Series) -> str:
        """Infer human-readable data type"""
        dtype = series.dtype
        
        if pd.api.types.is_integer_dtype(dtype):
            return "Integer"
        elif pd.api.types.is_float_dtype(dtype):
            return "Float"
        elif pd.api.types.is_bool_dtype(dtype):
            return "Boolean"
        elif pd.api.types.is_datetime64_any_dtype(dtype):
            return "DateTime"
        elif dtype == 'object':
            # Try to infer if it's actually a date
            sample = series.dropna().head(100)
            if len(sample) > 0:
                try:
                    pd.to_datetime(sample)
                    return "Date (as Text)"
                except:
                    pass
            return "Text"
        else:
            return str(dtype)
    
    def _get_most_common(self, series: pd.Series, top_n: int = 5) -> List[Dict[str, Any]]:
        """Get most common values for categorical columns"""
        value_counts = series.value_counts().head(top_n)
        
        return [
            {
                "value": str(val) if not pd.isna(val) else "NaN",
                "count": int(count),
                "percentage": round((count / len(series)) * 100, 2)
            }
            for val, count in value_counts.items()
        ]
    
    def _get_numeric_stats(self, series: pd.Series) -> Dict[str, float]:
        """Calculate statistics for numeric columns"""
        clean_series = series.dropna()
        
        if len(clean_series) == 0:
            return {}
        
        stats = {
            "min": float(clean_series.min()),
            "max": float(clean_series.max()),
            "mean": float(clean_series.mean()),
            "median": float(clean_series.median()),
            "std": float(clean_series.std()) if len(clean_series) > 1 else 0.0,
            "q25": float(clean_series.quantile(0.25)),
            "q75": float(clean_series.quantile(0.75)),
        }
        
        # Add skewness and kurtosis if enough data points
        if len(clean_series) > 3:
            stats["skewness"] = float(clean_series.skew())
            stats["kurtosis"] = float(clean_series.kurtosis())
        
        return stats
    
    def _check_duplicates(self) -> Dict[str, Any]:
        """Check for duplicate rows"""
        duplicate_count = self.df.duplicated().sum()
        
        return {
            "count": int(duplicate_count),
            "percentage": round((duplicate_count / len(self.df)) * 100, 2) if len(self.df) > 0 else 0.0,
            "has_duplicates": duplicate_count > 0
        }
    
    def _analyze_missing_values(self) -> Dict[str, Any]:
        """Analyze missing values across the dataset"""
        total_cells = self.df.size
        missing_cells = self.df.isna().sum().sum()
        
        return {
            "total_missing": int(missing_cells),
            "percentage": round((missing_cells / total_cells) * 100, 2) if total_cells > 0 else 0.0,
            "columns_with_missing": [
                col for col in self.df.columns 
                if self.df[col].isna().any()
            ]
        }


def load_dataset(file_path: str) -> pd.DataFrame:
    """
    Load dataset from file (CSV, XLSX, JSON)
    
    Args:
        file_path: Path to the dataset file
    
    Returns:
        pandas DataFrame
    
    Raises:
        ValueError: If file format is not supported
    """
    file_extension = Path(file_path).suffix.lower()
    
    try:
        if file_extension == '.csv':
            return pd.read_csv(file_path)
        elif file_extension in ['.xlsx', '.xls']:
            return pd.read_excel(file_path)
        elif file_extension == '.json':
            return pd.read_json(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_extension}")
    except Exception as e:
        raise ValueError(f"Failed to load dataset: {str(e)}")