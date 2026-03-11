import axios from "axios";

const api = axios.create({
  baseURL: "https://syncro-backend-gamma.vercel.app/",
});

// 1. REQUEST Interceptor: Attach token before sending the request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. RESPONSE Interceptor: Handle errors coming back from the server
api.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn("Session expired or invalid token. Logging out...");

      // Clean up local storage
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");

      // Redirect to the login page (root)
      window.location.href = "/";
    }

    // Always return the error so the calling function can catch it
    return Promise.reject(error);
  },
);

export default api;
