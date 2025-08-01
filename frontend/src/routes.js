const routes = {
  // Public Routes
  home: '/',
  login: '/login',
  register: '/register',

  // Admin Routes
  adminDashboard: '/admin/dashboard',
  createSubject: '/admin/create-subject',
  createQuestion: '/admin/create-question',
  createQuiz: '/admin/create-quiz',
  viewResults: '/admin/view-results',

  // Student Routes
  studentDashboard: '/student/dashboard',
  joinQuiz: '/student/join-quiz',
  attemptQuiz: (quizId = ':quizId') => `/student/attempt/${quizId}`,
  myResults: '/student/my-results',
};

export default routes;
