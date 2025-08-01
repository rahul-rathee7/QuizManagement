import { useState } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');

  const handleChange = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      questionText,
      questionType,
      options,
      correctAnswer,
      subject,
      difficulty,
    };
    onSubmit(newQuestion);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Question Text</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label>Question Type</label>
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="MCQ">MCQ</option>
          <option value="TrueFalse">True/False</option>
        </select>
      </div>

      {questionType === 'MCQ' && (
        <div>
          {options.map((opt, idx) => (
            <input
              key={idx}
              type="text"
              value={opt}
              placeholder={`Option ${idx + 1}`}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-full mb-2 border p-2 rounded"
              required
            />
          ))}
        </div>
      )}

      <div>
        <label>Correct Answer</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label>Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;
