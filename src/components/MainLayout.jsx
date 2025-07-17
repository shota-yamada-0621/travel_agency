import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { removeAccessToken } from "../utils/auth";

const MainLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAccessToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="columns" style={{ minHeight: "100vh" }}>
      {/* サイドバー */}
      <aside className="column is-2 has-background-light p-0">
        <div className="menu p-3">
          <p className="menu-label">メニュー</p>
          <ul className="menu-list">
            <li><a href="/">ダッシュボード</a></li>
            <li><a href="/customers">顧客管理</a></li>
            <li><a href="/reservations">予約管理</a></li>
            <li><a href="/tours">ツアー商品管理</a></li>
            <li><a href="/hotels">宿泊施設管理</a></li>
            <li><a href="/transports">交通手段管理</a></li>
            <li><a href="/invoices">請求書管理</a></li>
            <li><a href="/payments">支払い管理</a></li>
            <li><a href="/employees">社員管理</a></li>
            <li><a href="/partners">取引先管理</a></li>
            <li><a href="/inquiries">問い合わせ管理</a></li>
          </ul>
        </div>
      </aside>
      {/* メイン */}
      <div className="column is-10 p-0">
        <nav className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <span className="navbar-item has-text-weight-bold">旅行会社管理システム</span>
          </div>
          <div className="navbar-end pr-4">
            <button className="button is-danger" onClick={handleLogout}>ログアウト</button>
          </div>
        </nav>
        <main className="p-5">
          {/* ここでAppRoutesを呼び出す */}
          {require("../routes").default()}
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 