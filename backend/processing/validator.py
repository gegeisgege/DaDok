"""
Data Quality Validator - Detects issues and calculates health score
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Any
from scipy import stats

class DataQualityValidator:
    """
    Validates data quality and generates health score
    """
    
    def __init__(self, df: pd.DataFrame, profile: Dict[str, Any]):
        self.df = df
        self.profile = profile
        self.issues = []
        self.health_score = 100
    
    def validate(self) -> Dict[str, Any]:
        """
        Run all validation checks and calculate health score
        
        Returns:
            Dictionary containing issues and health score
        """
        # Run all validation checks
        self._check_missing_values()
        self._check_duplicates()
        self._check_type_consistency()
        self._check_outliers()
        self._check_constant_columns()
        self._check_high_cardinality()
        
        # Calculate final health score
        self.health_score = max(0, min(100, self.health_score))
        
        return {
            "issues": self.issues,
            "health_score": int(self.health_score),
            "score_label": self._get_score_label(self.health_score)
        }
    
    def _get_score_label(self, score: int) -> str:
        """Convert numeric score to label"""
        if score >= 90:
            return "Excellent"
        elif score >= 70:
            return "Good"
        elif score >= 50:
            return "Moderate"
        elif score >= 30:
            return "Poor"
        else:
            return "Critical"
    
    def _check_missing_values(self):
        """Detect missing value issues"""
        missing_info = self.profile.get("missing_values", {})
        missing_pct = missing_info.get("percentage", 0)
        
        if missing_pct > 0:
            # Determine severity
            if missing_pct > 20:
                severity = "critical"
                self.health_score -= 30
            elif missing_pct > 5:
                severity = "medium"
                self.health_score -= 15
            else:
                severity = "low"
                self.health_score -= 5
            
            # Get columns with most missing values
            columns_with_missing = []
            for col_info in self.profile.get("columns", []):
                if col_info["missing_percentage"] > 0:
                    columns_with_missing.append(col_info["name"])
            
            self.issues.append({
                "severity": severity,
                "category": "missing_values",
                "title": "Missing Values Detected",
                "description": f"{missing_pct}% of cells contain missing values",
                "affected_columns": columns_with_missing[:5],  # Top 5
                "count": missing_info.get("total_missing", 0),
                "percentage": missing_pct
            })
    
    def _check_duplicates(self):
        """Detect duplicate rows"""
        dup_info = self.profile.get("duplicates", {})
        dup_pct = dup_info.get("percentage", 0)
        
        if dup_pct > 0:
            if dup_pct > 10:
                severity = "critical"
                self.health_score -= 20
            elif dup_pct > 2:
                severity = "medium"
                self.health_score -= 10
            else:
                severity = "low"
                self.health_score -= 5
            
            self.issues.append({
                "severity": severity,
                "category": "duplicates",
                "title": "Duplicate Rows Found",
                "description": f"{dup_pct}% of rows are duplicates",
                "count": dup_info.get("count", 0),
                "percentage": dup_pct
            })
    
    def _check_type_consistency(self):
        """Check for type inconsistencies"""
        type_errors = []
        
        for col_info in self.profile.get("columns", []):
            col_name = col_info["name"]
            col_data = self.df[col_name]
            
            # Check if numeric column contains text
            if col_info["type"] in ["Integer", "Float"]:
                # Already numeric, no issue
                continue
            
            # Check if text column could be numeric
            if col_info["type"] == "Text":
                # Try converting to numeric
                sample = col_data.dropna().head(100)
                numeric_count = 0
                
                for val in sample:
                    try:
                        float(str(val))
                        numeric_count += 1
                    except:
                        pass
                
                # If more than 80% are numeric, flag as potential type error
                if len(sample) > 0 and (numeric_count / len(sample)) > 0.8:
                    type_errors.append(col_name)
        
        if type_errors:
            self.health_score -= 10
            
            self.issues.append({
                "severity": "medium",
                "category": "type_errors",
                "title": "Type Inconsistencies Detected",
                "description": f"{len(type_errors)} columns may have incorrect data types",
                "affected_columns": type_errors[:5],
                "count": len(type_errors)
            })
    
    def _check_outliers(self):
        """Detect outliers in numeric columns using IQR method"""
        outlier_columns = []
        
        for col_info in self.profile.get("columns", []):
            if col_info["type"] not in ["Integer", "Float"]:
                continue
            
            col_name = col_info["name"]
            col_data = self.df[col_name].dropna()
            
            if len(col_data) < 10:
                continue
            
            # IQR method
            Q1 = col_data.quantile(0.25)
            Q3 = col_data.quantile(0.75)
            IQR = Q3 - Q1
            
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers = ((col_data < lower_bound) | (col_data > upper_bound)).sum()
            outlier_pct = (outliers / len(col_data)) * 100
            
            if outlier_pct > 5:  # More than 5% outliers
                outlier_columns.append(col_name)
        
        if outlier_columns:
            self.health_score -= 5
            
            self.issues.append({
                "severity": "low",
                "category": "outliers",
                "title": "Outliers Detected",
                "description": f"{len(outlier_columns)} numeric columns contain outliers",
                "affected_columns": outlier_columns[:5],
                "count": len(outlier_columns)
            })
    
    def _check_constant_columns(self):
        """Detect columns with only one unique value"""
        constant_columns = []
        
        for col_info in self.profile.get("columns", []):
            if col_info["unique_count"] == 1:
                constant_columns.append(col_info["name"])
        
        if constant_columns:
            self.health_score -= 10
            
            self.issues.append({
                "severity": "medium",
                "category": "constant_columns",
                "title": "Constant Columns Found",
                "description": f"{len(constant_columns)} columns contain only one unique value",
                "affected_columns": constant_columns,
                "count": len(constant_columns)
            })
    
    def _check_high_cardinality(self):
        """Detect columns with suspiciously high cardinality (potential ID columns)"""
        high_card_columns = []
        
        for col_info in self.profile.get("columns", []):
            # If unique percentage > 95%, might be an ID column
            if col_info["unique_percentage"] > 95 and col_info["type"] != "Text":
                high_card_columns.append(col_info["name"])
        
        if high_card_columns:
            self.health_score -= 5
            
            self.issues.append({
                "severity": "low",
                "category": "high_cardinality",
                "title": "High Cardinality Columns",
                "description": f"{len(high_card_columns)} columns may be ID fields or contain mostly unique values",
                "affected_columns": high_card_columns[:5],
                "count": len(high_card_columns)
            })