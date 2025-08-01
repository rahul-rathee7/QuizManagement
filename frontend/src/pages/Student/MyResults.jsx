import { useEffect, useState } from 'react';
import { getStudentResults } from '../../api';

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await getStudentResults();
        setResults(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching results:', err);
        setError('Failed to load results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">My Results</h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">My Results</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Results</h2>
      {results.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No results found. Take some quizzes to see your results here!</p>
        </div>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Quiz</th>
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Score</th>
              <th className="border px-2 py-1">Total</th>
              <th className="border px-2 py-1">Percentage</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td className="border px-2 py-1">{result.quiz?.title || 'Unknown Quiz'}</td>
                <td className="border px-2 py-1">{result.quiz?.subject?.name || 'Unknown Subject'}</td>
                <td className="border px-2 py-1">{result.score}</td>
                <td className="border px-2 py-1">{result.totalQuestions}</td>
                <td className="border px-2 py-1">{((result.score / result.totalQuestions) * 100).toFixed(1)}%</td>
                <td className="border px-2 py-1">{new Date(result.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyResults;
