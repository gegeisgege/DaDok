import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadZone from '../components/UploadZone';
import PrivacyPopup from '../components/PrivacyPopup';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  const handleUploadSuccess = async (uploadResult) => {
    const { dataset_id, filename } = uploadResult;

    try {
      setIsAnalyzing(true);
      setAnalysisError(null);

      // Trigger dataset analysis
      await api.analyzeDataset(dataset_id);

      // Navigate to report page
      navigate(`/report/${dataset_id}`, {
        state: { filename },
      });
    } catch (error) {
      setAnalysisError(error.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Privacy Popup */}
      <PrivacyPopup />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
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
                <h1 className="text-3xl font-bold text-gray-900">
                  DADOK
                </h1>
                <p className="text-sm text-gray-600">Dataset Doktor</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                How It Works
              </a>
              <a
                href="/privacy"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Privacy
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
            Your Automated Data Health Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload any dataset and receive a comprehensive health report, automated cleaning 
            suggestions, and a repaired dataset ready for analysis—all in seconds.
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-16">
          <UploadZone onUploadSuccess={handleUploadSuccess} />

          {/* Analysis Loading State */}
          {isAnalyzing && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-4">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
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
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    Analyzing your dataset...
                  </h3>
                  <p className="text-sm text-blue-700">
                    Running diagnostics, detecting anomalies, and calculating health score
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Error */}
          {analysisError && (
            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-red-600 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-red-900">Analysis Failed</h3>
                  <p className="text-sm text-red-700 mt-1">{analysisError}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Automated Profiling
            </h3>
            <p className="text-gray-600">
              Instant analysis of data types, distributions, missing values, and duplicates across all columns.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Quality Diagnostics
            </h3>
            <p className="text-gray-600">
              Detect anomalies, outliers, format inconsistencies, and categorical issues with severity ratings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              One-Click Repair
            </h3>
            <p className="text-gray-600">
              Automatically normalize categories, impute missing values, and remove duplicates with transparency.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload</h4>
              <p className="text-sm text-gray-600">Drop your CSV, XLSX, or JSON file</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analyze</h4>
              <p className="text-sm text-gray-600">Automated diagnostics in seconds</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Review</h4>
              <p className="text-sm text-gray-600">Get comprehensive health report</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
              <p className="text-sm text-gray-600">Export cleaned dataset</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-gray-400">
                Built with ❤️ for the data community
              </p>
            </div>
            <div className="flex gap-6">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;