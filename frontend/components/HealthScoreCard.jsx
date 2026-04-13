import PropTypes from 'prop-types';

const HealthScoreCard = ({ score, metadata }) => {
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
    if (score >= 30) return 'Poor ⚠️⚠️';
    return 'Critical 🚨';
  };

  const getScoreDescription = (score) => {
    if (score >= 90) return 'Your dataset is in excellent condition with minimal issues detected.';
    if (score >= 70) return 'Your dataset is in good shape with some minor issues to address.';
    if (score >= 50) return 'Your dataset has moderate quality issues that should be cleaned.';
    if (score >= 30) return 'Your dataset has significant quality issues requiring attention.';
    return 'Your dataset has critical issues that need immediate cleaning.';
  };

  const getProgressColor = (score) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-blue-500 to-blue-600';
    if (score >= 50) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dataset Health Score</h2>
        <p className="text-gray-600">{getScoreDescription(score)}</p>
      </div>

      {/* Score Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Background circle */}
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#scoreGradient)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - score / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`${getProgressColor(score).split(' ')[0].replace('from-', 'stop-')}`} />
                <stop offset="100%" className={`${getProgressColor(score).split(' ')[1].replace('to-', 'stop-')}`} />
              </linearGradient>
            </defs>
          </svg>

          {/* Score number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getHealthScoreColor(score).split(' ')[0]}`}>
                {score}
              </div>
              <div className="text-gray-600 text-sm font-medium mt-1">/ 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="text-center mb-8">
        <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${getHealthScoreColor(score)}`}>
          {getHealthScoreLabel(score)}
        </span>
      </div>

      {/* Metadata Quick Stats */}
      {metadata && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {metadata.total_rows?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Rows</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {metadata.total_columns || 0}
            </div>
            <div className="text-sm text-gray-600">Columns</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {metadata.file_size || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">30m</div>
            <div className="text-sm text-gray-600">Auto-delete</div>
          </div>
        </div>
      )}
    </div>
  );
};

HealthScoreCard.propTypes = {
  score: PropTypes.number.isRequired,
  metadata: PropTypes.shape({
    total_rows: PropTypes.number,
    total_columns: PropTypes.number,
    file_size: PropTypes.string,
    upload_date: PropTypes.string,
  }),
};

export default HealthScoreCard;