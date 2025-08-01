import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">QuizApp</Link>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm">Welcome, {user.name}</span>
            {user.role === 'admin' ? (
              <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
            ) : (
              <Link to="/student/dashboard" className="hover:underline">Dashboard</Link>
            )}
            <button 
              onClick={handleLogout}
              className="hover:underline bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
