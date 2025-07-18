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
    <div className="login-bg">
      <style>{`
        .login-bg {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #43c6ac 0%, #191654 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }
        .login-card {
          background: rgba(255,255,255,0.95);
          border-radius: 2.5rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
          padding: 3.5rem 2.5rem 2.5rem 2.5rem;
          min-width: 350px;
          max-width: 90vw;
          animation: cardFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55);
          position: relative;
          z-index: 2;
        }
        @keyframes cardFadeIn {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .login-title {
          font-weight: 900;
          letter-spacing: 0.12em;
          font-size: 2.2rem;
          background: linear-gradient(90deg, #43c6ac, #191654, #43c6ac);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 3s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .login-username-input {
          font-size: 1.2rem;
          border-radius: 2rem;
          border: 2px solid #43c6ac;
          transition: box-shadow 0.3s, border-color 0.3s;
          box-shadow: 0 2px 12px 0 rgba(67,198,172,0.08);
        }
        .login-username-input:focus {
          border-color: #191654;
          box-shadow: 0 0 0 4px rgba(67,198,172,0.18);
        }
        .login-btn {
          font-size: 1.3rem;
          border-radius: 2rem;
          font-weight: bold;
          letter-spacing: 0.1em;
          background: linear-gradient(90deg, #43c6ac, #191654);
          color: #fff;
          border: none;
          box-shadow: 0 4px 16px rgba(67,198,172,0.18);
          transition: background 0.3s, transform 0.18s, box-shadow 0.3s;
        }
        .login-btn:hover, .login-btn:focus {
          background: linear-gradient(90deg, #191654, #43c6ac);
          transform: scale(1.04);
          box-shadow: 0 8px 32px 0 rgba(67,198,172,0.22);
        }
        .login-icon-anim {
          font-size: 2.8rem;
          color: #43c6ac;
          margin-bottom: 1.2rem;
          animation: iconPop 1.2s cubic-bezier(.68,-0.55,.27,1.55);
        }
        @keyframes iconPop {
          0% { opacity: 0; transform: scale(0.5) rotate(-30deg); }
          80% { opacity: 1; transform: scale(1.15) rotate(8deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .login-particles {
          position: absolute;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 1;
        }
        .login-particles span {
          position: absolute;
          border-radius: 50%;
          opacity: 0.18;
          background: linear-gradient(135deg, #43c6ac, #191654);
          animation: particleMove 8s linear infinite;
        }
        .login-particles span:nth-child(1) { width: 60px; height: 60px; left: 10vw; top: 20vh; animation-delay: 0s; }
        .login-particles span:nth-child(2) { width: 40px; height: 40px; left: 80vw; top: 30vh; animation-delay: 1.2s; }
        .login-particles span:nth-child(3) { width: 80px; height: 80px; left: 50vw; top: 70vh; animation-delay: 2.4s; }
        .login-particles span:nth-child(4) { width: 30px; height: 30px; left: 30vw; top: 80vh; animation-delay: 3.6s; }
        .login-particles span:nth-child(5) { width: 100px; height: 100px; left: 70vw; top: 10vh; animation-delay: 4.8s; }
        @keyframes particleMove {
          0% { transform: scale(0.8) translateY(0); opacity: 0.18; }
          50% { transform: scale(1.2) translateY(-40px); opacity: 0.28; }
          100% { transform: scale(0.8) translateY(0); opacity: 0.18; }
        }
      `}</style>
      <div className="login-particles">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div className="login-card">
        <div className="login-icon-anim">
          <i className="fas fa-user-circle"></i>
        </div>
        <h1 className="login-title mb-5">TRAVEL AGENCY</h1>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="field mb-5">
            <div className="control has-icons-left">
              <input
                className="input login-username-input is-large"
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
            <button className="button login-btn is-large is-fullwidth" type="submit">
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 