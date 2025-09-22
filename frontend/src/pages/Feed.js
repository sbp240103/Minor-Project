
import React, { useState, useEffect } from 'react';
import FeedService from '../services/feed.service';
import RepositoryList from '../components/RepositoryList';

const Feed = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FeedService.getFeed().then(
      (response) => {
        setRepositories(response.data);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 py-12">
      <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-full p-3 mr-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">Your Feed</h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          repositories.length > 0 ? (
            <div className="grid gap-6">
              {repositories.map((repo) => (
                <div key={repo._id || repo.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex-1">
                    <div className="text-xl font-bold text-green-700 mb-1">{repo.name}</div>
                    <div className="text-gray-600 mb-2">{repo.description}</div>
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-6">
                    <span className="inline-block bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">{repo.language || 'Unknown'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-lg py-12">No feed items found.</div>
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
