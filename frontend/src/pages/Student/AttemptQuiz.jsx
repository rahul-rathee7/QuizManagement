import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getQuizById, submitQuizAnswers } from '../../api';

const AttemptQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await getQuizById(quizId);
        setQuiz(response.data);
        setQuestions(response.data.questions || []);
        setError('');
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Convert answers object to array format expected by backend
      const answersArray = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer
      }));
      
      await submitQuizAnswers(quizId, answersArray);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button 
          onClick={() => navigate('/student/join-quiz')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Submitted!</h2>
        <p className="text-green-600 mb-4">Thank you for completing the quiz.</p>
        <button 
          onClick={() => navigate('/student/my-results')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View My Results
        </button>
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <p className="text-gray-600">No questions found for this quiz.</p>
        <button 
          onClick={() => navigate('/student/join-quiz')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const currentQuestion = questions[current];

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{quiz.title}</h2>
        <p className="text-sm text-gray-600">Question {current + 1} of {questions.length}</p>
      </div>

      <div className="mb-6">
        <p className="text-lg mb-4">{currentQuestion?.questionText}</p>
        <div className="space-y-3">
          {currentQuestion?.options.map((opt, i) => (
            <label key={i} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={`q-${currentQuestion._id}`}
                className="mr-3"
                checked={answers[currentQuestion._id] === opt}
                onChange={() => handleAnswer(currentQuestion._id, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrent((prev) => prev - 1)}
          disabled={current === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400"
        >
          Previous
        </button>

        <div className="text-sm text-gray-600">
          {Object.keys(answers).length} of {questions.length} answered
        </div>

        {current === questions.length - 1 ? (
          <button 
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        ) : (
          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AttemptQuiz;
