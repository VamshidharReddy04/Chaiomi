import axios from "axios";

// Set the base URL for the API requests. It uses an environment variable VITE_API_URL if available,
// otherwise defaults to "/api" so requests match the backend's actual mount points
// (see backend/app.js: /api/contact, /api/applications, /api/auth, /api/admin) and are
// forwarded correctly by the Vite dev proxy (see frontend/vite.config.ts).
const apiBaseUrl = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 40000,
});

export default api;
