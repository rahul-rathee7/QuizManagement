import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quiz Management System</h1>
      <p className="text-lg mb-6">Please login or register to continue.</p>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Register</Link>
      </div>
    </div>
  );
};

export default Home;
