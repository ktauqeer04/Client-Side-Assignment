import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage.jsx';
import UploadPage from './pages/UploadPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const PAGE_SIZE = 5;

function Homepage() {
  const [videos, setVideos] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/v1/videos/homepage', { params: { page } });
        setVideos(response.data.videos);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [page]);

  const token = localStorage.getItem('token');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4 space-x-4">
        {token ? (
          <Link to="/upload" className="px-4 py-2 border rounded hover:bg-gray-100">
            Upload
          </Link>
        ) : (
          <>
            <Link to="/signup" className="px-4 py-2 border rounded hover:bg-gray-100">
              Sign Up
            </Link>
            <Link to="/login" className="px-4 py-2 border rounded hover:bg-gray-100">
              Log In
            </Link>
          </>
        )}
      </div>

      <h1 className="text-2xl mb-4">Video Feed</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && videos.map(v => (
        <div key={v.id} className="mb-6">
          <h2 className="text-xl font-semibold">{v.title}</h2>
          <p className="text-sm text-gray-600">By {v.uploader.name}</p>
          <video src={v.videoUrl} controls className="w-full mt-2" />
        </div>
      ))}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded"
        >Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded"
        >Next</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}