const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
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
                <h1 className="text-3xl font-bold text-gray-900">DADOK</h1>
                <p className="text-sm text-gray-600">Dataset Doktor</p>
              </div>
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h2>

          <div className="prose prose-blue max-w-none space-y-6">
            {/* Introduction */}
            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🔒 Our Privacy Commitment
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Dadok is built with privacy-first principles. We process your datasets{' '}
                <strong>temporarily</strong> to provide quality diagnostics, and we{' '}
                <strong>never</strong> store your raw data permanently.
              </p>
            </section>

            {/* What We Collect */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                📊 What We Collect
              </h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  During Dataset Analysis:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Your uploaded dataset file (temporary)</li>
                  <li>Dataset metadata (row count, column names, data types)</li>
                  <li>Quality metrics (missing values, duplicates, health score)</li>
                  <li>Analysis timestamp</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  What We DO NOT Collect:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-green-800">
                  <li>Your actual dataset rows (deleted after analysis)</li>
                  <li>Personal information from your data</li>
                  <li>Email addresses or account details (no login required)</li>
                  <li>IP addresses or tracking cookies</li>
                </ul>
              </div>
            </section>

            {/* Data Processing */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ⚙️ How We Process Your Data
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Upload</h4>
                    <p className="text-gray-700">
                      Your file is uploaded via encrypted HTTPS connection to temporary storage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Analysis</h4>
                    <p className="text-gray-700">
                      Dataset is analyzed in-memory. Only metadata and quality metrics are extracted.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Deletion</h4>
                    <p className="text-gray-700">
                      Raw dataset files are <strong>automatically deleted within 30 minutes</strong>.
                      You can also download and delete immediately.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🕒 Data Retention
              </h3>
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Data Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Retention Period</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Raw Dataset Files</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <strong className="text-red-600">30 minutes (auto-delete)</strong>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">Quality Reports</td>
                    <td className="border border-gray-300 px-4 py-2">7 days (metadata only)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Consent Preferences</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Stored in your browser (localStorage)
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Security */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                🛡️ Security Measures
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    <strong>HTTPS Encryption:</strong> All data transfers are encrypted
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Isolated Processing:</strong> Each dataset processed in isolated environment
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    <strong>No Third-Party Sharing:</strong> Your data never leaves our servers
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    <strong>File Validation:</strong> All uploads scanned for malicious content
                  </span>
                </li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                ✅ Your Rights
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• You can request immediate deletion of your uploaded dataset</li>
                <li>• You have full control over what data you upload</li>
                <li>• No account creation required means no stored personal information</li>
                <li>• You can withdraw consent by leaving the site</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                📧 Contact Us
              </h3>
              <p className="text-gray-700">
                If you have any questions about this privacy policy or how we handle your data,
                please reach out to us at:{' '}
                <a href="mailto:privacy@dadok.com" className="text-blue-600 hover:underline">
                  privacy@dadok.com
                </a>
              </p>
            </section>

            {/* Last Updated */}
            <section className="mt-8 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-500">
                <strong>Last Updated:</strong> April 2026
              </p>
            </section>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">
            Built with ❤️ for the data community
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;