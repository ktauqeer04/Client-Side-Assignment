import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      setError('You must be logged in to upload.');
      return;
    }


    if (!title.trim() || !description.trim() || !file) {
      setError('Title, description, and video file are all required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('video', file);

      const response = await axios.post(
        'http://localhost:3000/v1/videos/uploads',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        alert('Upload Successful');
        navigate('/');
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err.response || err.message);
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Upload Video</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            className="w-full p-2 border rounded"
            placeholder="Video title"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(''); }}
            className="w-full p-2 border rounded"
            placeholder="Video description"
          />
        </div>
        <div>
          <label className="block mb-1">Select Video File</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full py-2 border rounded hover:bg-gray-100">
          Upload
        </button>
      </form>
    </div>
  );
}