// utils/auth.js
export const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Check for the presence of a JWT token
  };
  