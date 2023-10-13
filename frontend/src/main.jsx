import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthenticationProvider } from "./hooks/auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
