import { useState, useEffect } from 'react';
import { createQuiz, getSubjects, getQuestions } from '../../api';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [duration, setDuration] = useState(10);
  const [totalMarks, setTotalMarks] = useState(10);
  const [scheduledDate, setScheduledDate] = useState('');
  const [randomize, setRandomize] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjects(response.data);
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setError('Failed to load subjects');
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!subject) {
        setQuestions([]);
        return;
      }

      try {
        const response = await getQuestions(subject);
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions for this subject');
      }
    };

    fetchQuestions();
  }, [subject]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !subject || selectedQuestions.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const quizData = {
        title,
        subject,
        questionBank: selectedQuestions,
        duration,
        totalMarks,
        scheduledAt: scheduledDate,
        randomize,
      };

      await createQuiz(quizData);
      
      // Reset form
      setTitle('');
      setSubject('');
      setSelectedQuestions([]);
      setDuration(10);
      setTotalMarks(10);
      setScheduledDate('');
      setRandomize(false);
      setSuccess('Quiz created successfully!');
    } catch (err) {
      console.error('Error creating quiz:', err);
      setError('Failed to create quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionToggle = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title *</label>
          <input
            type="text"
            placeholder="Enter quiz title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
          <select
            className="w-full p-2 border rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select a subject</option>
            {subjects.map((subj) => (
              <option key={subj._id} value={subj._id}>
                {subj.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks *</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded"
              value={totalMarks}
              onChange={(e) => setTotalMarks(parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date *</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={randomize}
              onChange={() => setRandomize(!randomize)}
            />
            Randomize Questions
          </label>
        </div>

        {subject && questions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Questions * ({selectedQuestions.length} selected)
            </label>
            <div className="max-h-60 overflow-y-auto border rounded p-2">
              {questions.map((question) => (
                <div key={question._id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question._id)}
                    onChange={() => handleQuestionToggle(question._id)}
                  />
                  <span className="text-sm">{question.questionText}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
