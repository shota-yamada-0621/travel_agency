import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/Login";
import MainLayout from "../components/MainLayout";
import { getAccessToken } from "../common/auth";
import { SnackbarProvider } from "../components/SnackbarContext";

function RequireAuth({ children }) {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const App = () => (
  <SnackbarProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </SnackbarProvider>
);

export default App; 