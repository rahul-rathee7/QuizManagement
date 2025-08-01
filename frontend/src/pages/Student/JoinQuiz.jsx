import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableQuizzes } from '../../api';

const JoinQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getAvailableQuizzes();
        setQuizzes(response.data);
        setError('');
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError('Failed to load quizzes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No quizzes available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-semibold">{quiz.subject?.name || 'Unknown Subject'}</p>
                <p className="text-sm text-gray-600">
                  Scheduled: {new Date(quiz.scheduledDate).toLocaleDateString()} | 
                  Duration: {quiz.duration} min | 
                  Questions: {quiz.questions?.length || 0}
                </p>
              </div>
              <Link 
                to={`/student/attempt/${quiz._id}`} 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Join Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinQuiz;
