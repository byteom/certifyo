import { X, Check, AlertCircle } from 'lucide-react';

interface CodeSuggestionPanelProps {
  userCode: string;
  suggestionCode: string;
  _language: string;
  strengths: string[];
  improvements: string[];
  score?: number;
  onClose?: () => void;
  onApply?: (code: string) => void;
}

export default function CodeSuggestionPanel({
  userCode,
  suggestionCode,
  _language,
  strengths,
  improvements,
  score,
  onClose,
  onApply
}: CodeSuggestionPanelProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-lg border border-purple-900/40 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            Code Suggestion
            {score !== undefined && (
              <span className="ml-2 px-2 py-0.5 bg-purple-900/30 border border-purple-800/50 rounded-full text-sm">
                Score: {score}/10
              </span>
            )}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Comparison */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Your Code</h4>
                <pre className="bg-gray-800 rounded-lg p-4 overflow-auto text-sm">
                  <code>{userCode}</code>
                </pre>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Code</h4>
                <pre className="bg-gray-800 rounded-lg p-4 overflow-auto text-sm">
                  <code>{suggestionCode}</code>
                </pre>
              </div>
            </div>

            {/* Analysis */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-gray-300 bg-green-900/20 border border-green-800/30 rounded-lg p-3">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-2">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-gray-300 bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
          >
            Close
          </button>
          <button
            onClick={() => onApply?.(suggestionCode)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Apply Suggestion
          </button>
        </div>
      </div>
    </div>
  );
} 