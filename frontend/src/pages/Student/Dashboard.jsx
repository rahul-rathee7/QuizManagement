import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/student/join-quiz" className="block bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">
          📘 Join Available Quizzes
        </Link>
        <Link to="/student/my-results" className="block bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
          📊 View My Results
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
