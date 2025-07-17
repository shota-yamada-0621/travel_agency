import React, { useState } from "react";
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

const BASIC_AUTH_KEY = "basicAuthPassed";
const BASIC_USER = "admin";
const BASIC_PASS = "password";

const BasicAuthWrapper = ({ children }) => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(BASIC_AUTH_KEY) === "1");
  const [error, setError] = useState("");

  const handleAuth = () => {
    const user = window.prompt("ユーザー名を入力してください", "");
    const pass = window.prompt("パスワードを入力してください", "");
    if (user === BASIC_USER && pass === BASIC_PASS) {
      sessionStorage.setItem(BASIC_AUTH_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("認証に失敗しました。ページを再読み込みして再試行してください。");
    }
  };

  React.useEffect(() => {
    if (!authed) handleAuth();
    // eslint-disable-next-line
  }, []);

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8ffae" }}>
        <div className="box has-text-centered" style={{ minWidth: 320, minHeight: 180, borderRadius: "1.5rem" }}>
          <h2 className="title is-4">ベーシック認証</h2>
          <p>認証が必要です。</p>
          {error && <p className="has-text-danger mt-4">{error}</p>}
        </div>
      </div>
    );
  }
  return children;
};

const App = () => (
  <BasicAuthWrapper>
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
  </BasicAuthWrapper>
);

export default App; 