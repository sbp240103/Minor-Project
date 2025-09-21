
import React, { useState, useEffect } from 'react';
import RepositoryService from '../services/repository.service';
import { Link } from 'react-router-dom';

const RepositoryList = ({ repositories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repositories.map((repo) => (
        <div key={repo._id} className="border rounded p-4">
          <h3 className="font-bold text-lg">
            <Link to={`/repository/${repo._id}`}>{repo.name}</Link>
          </h3>
          <p className="text-gray-600">by {repo.owner.username}</p>
          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
