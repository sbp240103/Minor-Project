
import React, { useState } from 'react';
import RepositoryService from '../services/repository.service';

const UploadRepository = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      await RepositoryService.uploadRepository(formData);
      // Redirect to the new repository page or show a success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleUpload} className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-5">Upload Repository</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Files</label>
          <input
            type="file"
            multiple
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadRepository;
