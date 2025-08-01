// src/api/api.js
import axios from "axios";

// 🔗 Base URL for backend (adjust if you're using env vars or deployed URL)
const API = axios.create({
  baseURL: "http://localhost:5000/api", // 💡 Update if needed
  withCredentials: true,
});

// 🔐 Add token in headers (if JWT stored in localStorage)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ====================== AUTH ======================

// Student Register/Login
export const studentRegister = (formData) => API.post("/auth/student/register", formData);
export const studentLogin = (formData) => API.post("/auth/student/login", formData);

// Admin Login
export const adminLogin = (formData) => API.post("/auth/admin/login", formData);

// ====================== SUBJECTS ======================

export const getSubjects = () => API.get("/admin/subjects");
export const createSubject = (subjectData) => API.post("/admin/subjects", subjectData);
export const updateSubject = (id, subjectData) => API.put(`/admin/subjects/${id}`, subjectData);
export const deleteSubject = (id) => API.delete(`/admin/subjects/${id}`);

// ====================== QUESTIONS ======================

export const getQuestions = (subjectId) => API.get(`/admin/questions/${subjectId}`);
export const createQuestion = (data) => API.post("/admin/questions", data);
export const updateQuestion = (id, data) => API.put(`/admin/questions/${id}`, data);
export const deleteQuestion = (id) => API.delete(`/admin/questions/${id}`);

// ====================== QUIZZES ======================

export const createQuiz = (data) => API.post("/admin/quizzes", data);
export const getAvailableQuizzes = () => API.get("/student/quizzes");
export const getQuizById = (id) => API.get(`/student/quizzes/${id}/start`);

// ====================== QUIZ ATTEMPT ======================

export const submitQuizAnswers = (quizId, answers) =>
  API.post(`/student/quizzes/${quizId}/submit`, { answers });

export const getStudentResults = () => API.get("/student/results");
export const getQuizResults = (quizId) => API.get(`/admin/results/${quizId}`);

// ====================== EXPORT RESULTS ======================

export const exportQuizCSV = (quizId) => API.get(`/admin/results/export/${quizId}`);
export const exportQuizPDF = (quizId) => API.get(`/admin/results/export/${quizId}`);
