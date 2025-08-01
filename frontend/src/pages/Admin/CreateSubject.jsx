import { useState } from 'react';
import { createSubject } from '../../api';

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subjectName.trim()) {
      setError('Please enter a subject name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await createSubject({ name: subjectName.trim() });
      
      setSubjectName('');
      setSuccess('Subject created successfully!');
    } catch (err) {
      console.error('Error creating subject:', err);
      setError('Failed to create subject. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Subject</h2>
      
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name *</label>
          <input
            type="text"
            required
            placeholder="Enter subject name"
            className="w-full p-2 border rounded"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Add Subject'}
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
