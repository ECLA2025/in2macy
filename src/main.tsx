import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="205295925445-djrl511digems6c9sa3hp18phqqvou2e.apps.googleusercontent.com">
      <App />
      <ToastContainer theme="dark" />
    </GoogleOAuthProvider>
  </StrictMode>
);
