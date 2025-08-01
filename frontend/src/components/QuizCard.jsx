import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-1">{quiz.title}</h3>
      <p className="text-sm text-gray-600 mb-2">Subject: {quiz.subject}</p>
      <p className="text-sm text-gray-600 mb-2">Duration: {quiz.duration} mins</p>
      <p className="text-sm text-gray-600 mb-2">Total Marks: {quiz.totalMarks}</p>
      <Link
        to={`/student/attempt/${quiz._id}`}
        className="mt-2 inline-block bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizCard;
