import { useState, useEffect } from 'react';

const PrivacyPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('dadok_privacy_consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dadok_privacy_consent', 'true');
    localStorage.setItem('dadok_consent_date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Redirect user away from the site
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            🔒 Data Privacy Notice
          </h2>
        </div>

        {/* Content */}
        <div className="mb-8 space-y-4">
          <p className="text-gray-700 text-lg">
            Dadok processes datasets <strong>temporarily</strong> to generate quality reports. 
            Your data will:
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 space-y-2">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                <strong>NOT</strong> be stored permanently
              </p>
            </div>

            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                <strong>NOT</strong> be shared with third parties
              </p>
            </div>

            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                <strong>NOT</strong> be used for training AI models
              </p>
            </div>

            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-800 font-medium">
                Be <strong>automatically deleted</strong> within 30 minutes
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>📊 What we keep:</strong> Only metadata (row count, column names, health scores) 
              is stored. Your actual dataset rows are never saved to our database.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAccept}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Agree and Continue
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Leave Site
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing, you acknowledge that you understand how Dadok processes your data.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPopup;