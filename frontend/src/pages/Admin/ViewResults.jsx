import { useState } from 'react';
import { getQuizResults } from '../../api';

const ViewResults = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Please enter a Quiz ID');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await getQuizResults(searchValue);
      setResults(response.data);
    } catch (err) {
      console.error('Error fetching results:', err);
      setError('Failed to load results. Please check the Quiz ID and try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">View Quiz Results</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Quiz ID"
          className="flex-1 p-2 border rounded"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch} 
          disabled={loading}
          className="px-4 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      )}

      {results.length > 0 && !loading && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Quiz Results</h3>
            <p className="text-sm text-gray-600">Total participants: {results.length}</p>
          </div>
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Roll Number</th>
                <th className="border px-2 py-1">Score</th>
                <th className="border px-2 py-1">Total Questions</th>
                <th className="border px-2 py-1">Percentage</th>
                <th className="border px-2 py-1">Time Taken</th>
                <th className="border px-2 py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td className="border px-2 py-1">{result.student?.name || 'Unknown'}</td>
                  <td className="border px-2 py-1">{result.student?.rollNumber || 'N/A'}</td>
                  <td className="border px-2 py-1">{result.score}</td>
                  <td className="border px-2 py-1">{result.totalQuestions}</td>
                  <td className="border px-2 py-1">{((result.score / result.totalQuestions) * 100).toFixed(1)}%</td>
                  <td className="border px-2 py-1">{result.timeTaken || 'N/A'}</td>
                  <td className="border px-2 py-1">{new Date(result.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && !loading && !error && searchValue && (
        <div className="text-center py-8">
          <p className="text-gray-600">No results found for this Quiz ID.</p>
        </div>
      )}
    </div>
  );
};

export default ViewResults;
