import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./Views/Landing";
import { AuthPage } from "./components/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatWithMacy } from "./Views/Chat/ChatWithMacy";
import Chats from "./Views/Chat/ChatPage";
import Profile from "./Views/Profile";
import { ProtectedLayout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/Auth" element={<AuthPage />} />

          {/* Protected routes with layout */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <ChatWithMacy />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Chats />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/icon"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Icon />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <HandHeart />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Profile />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
