
import React, { useState } from 'react';
import SearchService from '../services/search.service';
import RepositoryList from '../components/RepositoryList';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await SearchService.search(query);
      setResults(response.data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-5">Search</h2>
        <div className="flex">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-l"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-r">
            Search
          </button>
        </div>
      </form>
      <div className="mt-10">
        <RepositoryList repositories={results} />
      </div>
    </div>
  );
};

export default Search;
