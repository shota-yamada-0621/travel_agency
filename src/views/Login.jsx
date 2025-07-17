import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setAccessToken();
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "100vh" }}>
      <div className="box" style={{ minWidth: 320 }}>
        <h1 className="title is-4 has-text-centered">ログイン</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label className="label">ユーザー名</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名を入力"
                required
              />
            </div>
          </div>
          <div className="field mt-5">
            <button className="button is-primary is-fullwidth" type="submit">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 