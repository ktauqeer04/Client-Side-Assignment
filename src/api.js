import axios from 'axios';

const API_URL = 'http://localhost:3000/v1';

export async function signup(name, email, password) {
  const res = await axios.post(`${API_URL}/signup`, { name, email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export async function uploadVideo(title, description, file) {
  const form = new FormData();
  form.append('title', title);
  form.append('description', description);
  form.append('video', file);
  const res = await axios.post(
    `${API_URL}/upload`,
    form,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return res.data;
}

export async function fetchVideos(page = 1) {
  const res = await axios.get(`${API_URL}/videos`, { params: { page } });
  return res.data;
}