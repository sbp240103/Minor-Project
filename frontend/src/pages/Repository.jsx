
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RepositoryService from '../services/repository.service';
import AuthService from '../services/auth.service';

const Repository = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState(null);

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    RepositoryService.getRepository(id).then(
      (response) => {
        setRepository(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [id]);

  const handleLike = () => {
    RepositoryService.likeRepository(id).then(() => {
      window.location.reload();
    });
  };

  const handleUnlike = () => {
    RepositoryService.unlikeRepository(id).then(() => {
      window.location.reload();
    });
  };

  const [commentText, setCommentText] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    RepositoryService.addComment(id, commentText).then(() => {
      window.location.reload();
    });
  };

  const handleDeleteComment = (commentId) => {
    RepositoryService.deleteComment(id, commentId).then(() => {
      window.location.reload();
    });
  };

  if (!repository) {
    return <div>Loading...</div>;
  }

  const isLiked = repository.likes.includes(currentUser.user.id);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">{repository.name}</h2>
        <div className="ml-4">
          {isLiked ? (
            <button onClick={handleUnlike} className="bg-red-500 text-white py-1 px-3 rounded">Unlike</button>
          ) : (
            <button onClick={handleLike} className="bg-blue-500 text-white py-1 px-3 rounded">Like</button>
          )}
        </div>
      </div>
      <p className="text-gray-600">by <Link to={`/profile/${repository.owner._id}`}>{repository.owner.username}</Link></p>
      <p>{repository.likes.length} Likes</p>
      <p>{repository.description}</p>
      <div className="mt-5">
        <h3 className="text-xl font-bold">Tech Stack</h3>
        <div className="flex flex-wrap">
          {repository.techStack.map((tech) => (
            <span key={tech} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-bold">Summary</h3>
        <p>{repository.summary}</p>
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-bold">Comments</h3>
        <form onSubmit={handleAddComment}>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
            Add Comment
          </button>
        </form>
        <div className="mt-5">
          {repository.comments.map((comment) => (
            <div key={comment._id} className="border rounded p-3 mb-3">
              <p><strong>{comment.user.username}</strong></p>
              <p>{comment.text}</p>
              {currentUser.user.id === comment.user._id && (
                <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500">Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Repository;
