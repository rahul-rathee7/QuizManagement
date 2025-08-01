import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/create-subject" className="block bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">
          ➕ Create Subjects
        </Link>
        <Link to="/admin/create-question" className="block bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
          📝 Create Questions
        </Link>
        <Link to="/admin/create-quiz" className="block bg-purple-500 text-white p-4 rounded shadow hover:bg-purple-600">
          🧠 Create Quizzes
        </Link>
        <Link to="/admin/view-results" className="block bg-orange-500 text-white p-4 rounded shadow hover:bg-orange-600">
          📊 View Student Results
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
