// API Service Layer for Dadok
// Handles all communication with FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class DadokAPI {
  /**
   * Upload dataset file for analysis
   * @param {File} file - The dataset file (CSV, XLSX, JSON)
   * @returns {Promise<{dataset_id: string, filename: string}>}
   */
  async uploadDataset(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Upload failed');
    }

    return response.json();
  }

  /**
   * Run quality diagnostics on uploaded dataset
   * @param {string} datasetId - UUID of the uploaded dataset
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeDataset(datasetId) {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dataset_id: datasetId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Analysis failed');
    }

    return response.json();
  }

  /**
   * Get analysis report for a dataset
   * @param {string} datasetId - UUID of the dataset
   * @returns {Promise<Object>} Complete analysis report
   */
  async getReport(datasetId) {
    const response = await fetch(`${API_BASE_URL}/api/report/${datasetId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch report');
    }

    return response.json();
  }

  /**
   * Execute cleaning operations on dataset
   * @param {string} datasetId - UUID of the dataset
   * @param {Object} cleaningOptions - Cleaning configuration
   * @returns {Promise<Object>} Cleaning results
   */
  async cleanDataset(datasetId, cleaningOptions) {
    const response = await fetch(`${API_BASE_URL}/api/clean`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataset_id: datasetId,
        ...cleaningOptions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Cleaning failed');
    }

    return response.json();
  }

  /**
   * Download cleaned dataset
   * @param {string} datasetId - UUID of the dataset
   * @param {string} format - Export format (csv, xlsx, json)
   * @returns {Promise<Blob>} File blob for download
   */
  async downloadDataset(datasetId, format = 'csv') {
    const response = await fetch(
      `${API_BASE_URL}/api/download/${datasetId}?format=${format}`
    );

    if (!response.ok) {
      throw new Error('Download failed');
    }

    return response.blob();
  }

  /**
   * Helper: Trigger browser download
   * @param {Blob} blob - File blob
   * @param {string} filename - Suggested filename
   */
  triggerDownload(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

// Export singleton instance
export default new DadokAPI();