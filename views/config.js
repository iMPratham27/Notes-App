
const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

const BASE_API_URL = isLocalhost
  ? "http://localhost:5000/api" // Local backend
  : "https://your-backend.onrender.com/api"; // Deployed backend

//const BASE_API_URL = "http://localhost:5000/api";

const AUTH_API_URL = `${BASE_API_URL}/auth`;
const NOTES_API_URL = `${BASE_API_URL}/notes`;
