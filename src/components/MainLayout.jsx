import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../common/auth";
import AppRoutes from "../routes";

const menuItems = [
  { path: "/", label: "ダッシュボード", icon: "fas fa-home" },
  { path: "/customers", label: "顧客管理", icon: "fas fa-users" },
  { path: "/reservations", label: "予約管理", icon: "fas fa-calendar-check" },
  { path: "/tours", label: "ツアー商品管理", icon: "fas fa-map-marked-alt" },
  { path: "/hotels", label: "宿泊施設管理", icon: "fas fa-hotel" },
  { path: "/transports", label: "交通手段管理", icon: "fas fa-bus" },
  { path: "/invoices", label: "請求書管理", icon: "fas fa-file-invoice" },
  { path: "/payments", label: "支払い管理", icon: "fas fa-credit-card" },
  { path: "/employees", label: "社員管理", icon: "fas fa-user-tie" },
  { path: "/partners", label: "取引先管理", icon: "fas fa-handshake" },
  { path: "/inquiries", label: "問い合わせ管理", icon: "fas fa-envelope-open-text" },
];

const MainLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAccessToken();
    navigate("/login", { replace: true });
  };

  // 波紋エフェクト
  const handleRipple = (e) => {
    const target = e.currentTarget;
    const circle = document.createElement("span");
    circle.className = "ripple";
    const rect = target.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left}px`;
    circle.style.top = `${e.clientY - rect.top}px`;
    target.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  return (
    <>
      {/* アニメーション用CSS */}
      <style>{`
        .sidebar-link {
          border-radius: 1.5rem;
          font-weight: 600;
          font-size: 1.1rem;
          transition: background 0.2s, color 0.2s, transform 0.18s;
          color: #333;
          position: relative;
          overflow: hidden;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.35) !important;
          color: #0a7c6a !important;
          transform: scale(1.06) translateX(6px);
          box-shadow: 0 4px 24px 0 rgba(67,198,172,0.10);
        }
        .sidebar-link .icon {
          transition: transform 0.3s cubic-bezier(.68,-0.55,.27,1.55), color 0.2s;
        }
        .sidebar-link:hover .icon {
          transform: rotate(-12deg) scale(1.18);
          color: #0a7c6a;
        }
        .sidebar-link:active {
          transform: scale(0.98);
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(67,198,172,0.18);
          pointer-events: none;
          width: 120px;
          height: 120px;
          left: 50%;
          top: 50%;
          margin-left: -60px;
          margin-top: -60px;
          z-index: 1;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
      <div className="columns" style={{ minHeight: "100vh" }}>
        {/* サイドバー */}
        <aside
          className="column is-2 p-0"
          style={{
            background: "linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)",
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
            boxShadow: "2px 0 16px 0 rgba(67,198,172,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="menu py-5" style={{ width: "100%" }}>
            <p className="menu-label has-text-weight-bold has-text-grey-dark is-size-5 mb-4" style={{ letterSpacing: "0.1em", textAlign: "center" }}>メニュー</p>
            <ul className="menu-list" style={{ width: "100%", padding: "0 0.5rem" }}>
              {menuItems.map((item) => (
                <li key={item.path} style={{ marginBottom: 10 }}>
                  <a
                    href={item.path}
                    className="sidebar-link is-flex is-align-items-center px-2 py-2"
                    style={{ maxWidth: "92%", margin: "0 auto" }}
                    onClick={handleRipple}
                  >
                    <span className="icon is-medium mr-3" style={{ fontSize: "1.4rem" }}>
                      <i className={item.icon}></i>
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {/* メイン */}
        <div className="column is-10 p-0">
          <style>{`
            .animated-appbar {
              background: linear-gradient(90deg, #43c6ac, #f8ffae, #43c6ac, #f8ffae);
              background-size: 300% 300%;
              animation: appbar-glitter 5s linear infinite;
              border-bottom-left-radius: 2rem;
              border-bottom-right-radius: 2rem;
              box-shadow: 0 4px 24px 0 rgba(67,198,172,0.10);
              margin: 1.2rem 1.2rem 0 1.2rem;
              padding: 0.5rem 2rem;
              min-height: 64px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: relative;
              overflow: hidden;
            }
            @keyframes appbar-glitter {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .appbar-sparkle {
              position: absolute;
              pointer-events: none;
              top: 0; left: 0; width: 100%; height: 100%;
              z-index: 0;
            }
            .appbar-sparkle span {
              position: absolute;
              width: 8px; height: 8px;
              border-radius: 50%;
              background: rgba(255,255,255,0.7);
              filter: blur(1.5px);
              animation: sparkle-move 2.5s linear infinite;
            }
            .appbar-sparkle span:nth-child(1) { left: 10%; top: 30%; animation-delay: 0s; }
            .appbar-sparkle span:nth-child(2) { left: 40%; top: 60%; animation-delay: 0.7s; }
            .appbar-sparkle span:nth-child(3) { left: 70%; top: 20%; animation-delay: 1.2s; }
            .appbar-sparkle span:nth-child(4) { left: 85%; top: 50%; animation-delay: 1.7s; }
            .appbar-sparkle span:nth-child(5) { left: 55%; top: 10%; animation-delay: 2.1s; }
            @keyframes sparkle-move {
              0% { opacity: 0; transform: scale(0.7); }
              10% { opacity: 1; transform: scale(1.2); }
              90% { opacity: 1; transform: scale(1.2); }
              100% { opacity: 0; transform: scale(0.7); }
            }
          `}</style>
          <nav className="navbar animated-appbar">
            <div className="appbar-sparkle">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className="is-flex is-align-items-center">
              <span className="icon is-large mr-3" style={{ fontSize: "2rem", color: "#0a7c6a" }}>
                <i className="fas fa-globe-asia"></i>
              </span>
              <span className="has-text-weight-bold is-size-4" style={{ letterSpacing: "0.08em", color: "#0a7c6a" }}>
                旅行会社管理システム
              </span>
            </div>
            <div className="is-flex is-align-items-center">
              <span className="icon is-medium mr-2" style={{ color: "#0a7c6a" }}>
                <i className="fas fa-user-circle"></i>
              </span>
              <span className="mr-4 has-text-weight-semibold" style={{ color: "#0a7c6a" }}>山田 太郎</span>
              <button className="button is-danger is-rounded" onClick={handleLogout} style={{ fontWeight: 600 }}>
                <span className="icon"><i className="fas fa-sign-out-alt"></i></span>
                <span>ログアウト</span>
              </button>
            </div>
          </nav>
          <main className="p-5">
            {/* ここでAppRoutesを呼び出す */}
            <AppRoutes />
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout; 