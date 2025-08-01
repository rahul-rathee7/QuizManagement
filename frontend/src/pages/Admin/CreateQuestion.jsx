import { useState, useEffect } from 'react';
import { createQuestion, getSubjects } from '../../api';

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [subjects, setSubjects] = useState([]);
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

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!questionText.trim() || !subject || !correctAnswer.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (options.some(opt => !opt.trim())) {
      setError('Please fill in all options');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const questionData = {
        questionText,
        options,
        correctAnswer,
        subject,
        difficulty,
      };

      await createQuestion(questionData);
      
      // Reset form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      setSubject('');
      setDifficulty('easy');
      setSuccess('Question created successfully!');
    } catch (err) {
      console.error('Error creating question:', err);
      setError('Failed to create question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>
      
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
          <textarea
            placeholder="Enter your question here..."
            className="w-full p-2 border rounded"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Options *</label>
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              className="w-full p-2 border rounded mb-2"
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, i)}
              required
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer *</label>
          <input
            type="text"
            placeholder="Enter the correct answer"
            className="w-full p-2 border rounded"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            className="w-full p-2 border rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Add Question'}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
