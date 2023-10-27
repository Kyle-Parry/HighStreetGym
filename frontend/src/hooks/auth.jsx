/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ router, children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticatedUser == null) {
      const authKey = localStorage.getItem("authKey");
      if (authKey) {
        // Set the header for Axios
        axios.defaults.headers.common["X-AUTH-KEY"] = authKey;

        // Fetch the logged-in user from the backend using the full URL
        axios
          .get(`http://localhost:8080/users/key/${authKey}`)
          .then((response) => {
            setAuthenticatedUser(response.data.user);
          })
          .catch(() => {
            // Failed to retrieve the user, clear the session and redirect to the root
            setAuthenticatedUser(null);
            localStorage.removeItem("authKey");
            navigate("/");
          });
      }
    }
  }, [authenticatedUser, router]);

  return (
    <AuthenticationContext.Provider
      value={[authenticatedUser, setAuthenticatedUser]}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const [authenticatedUser, setAuthenticatedUser] = useContext(
    AuthenticationContext
  );

  async function login(email, password) {
    setAuthenticatedUser(null);

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        // Save the authKey to localStorage
        localStorage.setItem("authKey", response.data.authKey);
        axios.defaults.headers.common["X-AUTH-KEY"] = response.data.authKey;
        const userResponse = await axios.get(
          `http://localhost:8080/users/key/${response.data.authKey}`
        );
        setAuthenticatedUser(userResponse.data.user);
        return response.data.message;
      } else {
        return Promise.reject(response.data.message);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function logout() {
    const authKey = localStorage.getItem("authKey");
    if (authKey) {
      try {
        // Send a POST request using the full URL to log out the user
        await axios.post(`http://localhost:8080/users/logout`, {
          authKey: authKey,
        });
        setAuthenticatedUser(null);
        localStorage.removeItem("authKey");
        delete axios.defaults.headers.common["X-AUTH-KEY"];
        return "User logged out";
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }

  return [authenticatedUser, login, logout];
}
