
import React, { useState } from 'react';
import RepositoryService from '../services/repository.service';

const UploadRepository = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    const data = {
      name,
      description,
      githubRepo
    };
    try {
      const response = await RepositoryService.uploadRepository(data);
      if (response.data.geminiError) {
        setSuccess('Repository added, but summary/tech stack could not be generated.');
        setError(response.data.geminiError);
      } else {
        setSuccess('Repository added successfully!');
        setError('');
      }
      setName('');
      setDescription('');
      setGithubRepo('');
    } catch (error) {
      setError(error?.response?.data?.error || 'Failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="flex items-center mb-8 justify-center">
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-4 shadow-lg mr-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M4 10h16" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Upload Repository</h2>
        </div>
        <form onSubmit={handleUpload} className="space-y-6">
          {success && <div className="text-green-600 bg-green-100 border-l-4 border-green-500 p-3 rounded">{success}</div>}
          {error && <div className="text-red-600 bg-red-100 border-l-4 border-red-500 p-3 rounded">{error}</div>}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">GitHub Repository</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="e.g. owner/repo or repo URL"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                Uploading...
              </span>
            ) : (
              'Upload'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadRepository;
