import React, { useState } from "react";
import { setAccessToken } from "../common/auth";

const LOGIN_USER_KEY = "loginUserName";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setAccessToken();
      localStorage.setItem(LOGIN_USER_KEY, username);
      window.location.replace("/");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ minHeight: "60vh", width: "50vw", display: "flex", justifyContent: "center", alignItems: "center", background: 'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)' }}>
        <div className="box has-text-centered" style={{ minWidth: 500, minHeight: 500, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)', borderRadius: '2rem', background: 'rgba(255,255,255,0.95)' }}>
          <h1 className="title is-2 has-text-primary mb-5" style={{ fontWeight: 900, letterSpacing: '0.1em' }}>
            ログイン
          </h1>
          <form onSubmit={handleLogin}>
            <div className="field mb-5">
              <label className="label is-large has-text-info" style={{ fontSize: '1.3rem' }}>
                ユーザー名
              </label>
              <div className="control has-icons-left">
                <input
                  className="input is-large is-rounded"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ユーザー名を入力"
                  required
                  style={{ fontSize: '1.2rem' }}
                />
                <span className="icon is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field mt-6">
              <button className="button is-primary is-large is-fullwidth is-rounded has-text-weight-bold" type="submit" style={{ fontSize: '1.3rem', letterSpacing: '0.1em', boxShadow: '0 4px 16px rgba(67,198,172,0.2)' }}>
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 