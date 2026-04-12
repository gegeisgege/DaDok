import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';

const Report = () => {
  const { datasetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const filename = location.state?.filename || 'dataset';

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [datasetId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call when backend is ready
      // const data = await api.getReport(datasetId);
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockReport = {
        dataset_id: datasetId,
        filename: filename,
        metadata: {
          total_rows: 1500,
          total_columns: 12,
          file_size: '2.3 MB',
          upload_date: new Date().toISOString(),
        },
        health_score: 78,
        issues: {
          missing_values: { severity: 'medium', count: 45, percentage: 3.2 },
          duplicates: { severity: 'low', count: 12, percentage: 0.8 },
          outliers: { severity: 'medium', count: 23, percentage: 1.5 },
          type_errors: { severity: 'low', count: 5, percentage: 0.3 },
        },
        column_summary: [
          { name: 'id', type: 'integer', missing: 0, unique: 1500 },
          { name: 'name', type: 'string', missing: 5, unique: 1480 },
          { name: 'age', type: 'integer', missing: 12, unique: 65 },
          { name: 'email', type: 'string', missing: 8, unique: 1490 },
          { name: 'salary', type: 'float', missing: 20, unique: 890 },
        ],
      };
      
      setReport(mockReport);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format = 'csv') => {
    try {
      // TODO: Implement actual download when backend is ready
      // const blob = await api.downloadDataset(datasetId, format);
      // api.triggerDownload(blob, `${filename}_cleaned.${format}`);
      
      alert(`Download feature coming soon! Format: ${format}`);
    } catch (err) {
      alert('Download failed: ' + err.message);
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getHealthScoreLabel = (score) => {
    if (score >= 90) return 'Excellent ✅';
    if (score >= 70) return 'Good 👍';
    if (score >= 50) return 'Moderate ⚠️';
    return 'Needs Work 🚨';
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
    };
    return colors[severity] || colors.low;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">Loading Report...</h2>
          <p className="text-gray-600 mt-2">Analyzing your dataset</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Report</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dataset Report</h1>
                <p className="text-sm text-gray-600">{report.filename}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Health Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dataset Health Score</h2>
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-5xl font-bold mb-4 ${getHealthScoreColor(report.health_score)}`}>
              {report.health_score}
            </div>
            <p className="text-xl font-semibold text-gray-700">
              {getHealthScoreLabel(report.health_score)}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{report.metadata.total_rows.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Rows</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{report.metadata.total_columns}</p>
                <p className="text-sm text-gray-600">Columns</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{report.metadata.file_size}</p>
                <p className="text-sm text-gray-600">File Size</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-orange-100 p-2 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">30 min</p>
                <p className="text-sm text-gray-600">Auto-delete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Quality Issues</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(report.issues).map(([key, issue]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {key.replace('_', ' ')}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityBadge(issue.severity)}`}>
                    {issue.severity.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{issue.count}</span>
                  <span className="text-sm text-gray-600">({issue.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Column Summary</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Column Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Missing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Unique Values
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {report.column_summary.map((col, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {col.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        {col.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {col.missing} {col.missing > 0 && <span className="text-red-600">⚠️</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {col.unique.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Download Cleaned Dataset</h3>
            <p className="mb-6 text-blue-100">
              Export your analyzed dataset in your preferred format
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDownload('csv')}
                className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Download CSV
              </button>
              <button
                onClick={() => handleDownload('xlsx')}
                className="bg-white text-purple-600 font-semibold py-3 px-8 rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
              >
                Download XLSX
              </button>
              <button
                onClick={() => handleDownload('json')}
                className="bg-white text-green-600 font-semibold py-3 px-8 rounded-lg hover:bg-green-50 transition-colors shadow-lg"
              >
                Download JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;