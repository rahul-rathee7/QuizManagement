import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/Admin/Dashboard';
import CreateSubject from './pages/Admin/CreateSubject';
import CreateQuestion from './pages/Admin/CreateQuestion';
import CreateQuiz from './pages/Admin/CreateQuiz';
import ViewResults from './pages/Admin/ViewResults';

import StudentDashboard from './pages/Student/Dashboard';
import JoinQuiz from './pages/Student/JoinQuiz';
import AttemptQuiz from './pages/Student/AttemptQuiz';
import MyResults from './pages/Student/MyResults';

import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-subject" element={<CreateSubject />} />
          <Route path="/admin/create-question" element={<CreateQuestion />} />
          <Route path="/admin/create-quiz" element={<CreateQuiz />} />
          <Route path="/admin/view-results" element={<ViewResults />} />

          {/* Student */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/join-quiz" element={<JoinQuiz />} />
          <Route path="/student/attempt/:quizId" element={<AttemptQuiz />} />
          <Route path="/student/my-results" element={<MyResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
