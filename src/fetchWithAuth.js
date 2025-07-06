export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
}



// import { fetchWithAuth } from './fetchWithAuth';

// const response = await fetchWithAuth('http://localhost:8080/api/v1/some-endpoint', {
//   method: 'GET',
// });
