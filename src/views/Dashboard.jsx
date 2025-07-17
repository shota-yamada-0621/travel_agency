import React from "react";

const Dashboard = () => (
  <div className="container py-6">
    {/* ヒーローセクション */}
    <section className="hero is-primary is-bold mb-6" style={{ borderRadius: '1.5rem' }}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title is-2 has-text-weight-bold">旅行会社管理システム</h1>
          <h2 className="subtitle is-4">ようこそ、管理ダッシュボードへ！</h2>
        </div>
      </div>
    </section>

    {/* 統計カード */}
    <div className="columns is-multiline mb-5">
      <div className="column is-3">
        <div className="box has-background-info-light has-text-centered">
          <span className="icon is-large has-text-info">
            <i className="fas fa-users fa-2x"></i>
          </span>
          <p className="title is-4 mb-1">1,234</p>
          <p className="subtitle is-6">顧客数</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-success-light has-text-centered">
          <span className="icon is-large has-text-success">
            <i className="fas fa-calendar-check fa-2x"></i>
          </span>
          <p className="title is-4 mb-1">567</p>
          <p className="subtitle is-6">予約数</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-warning-light has-text-centered">
          <span className="icon is-large has-text-warning">
            <i className="fas fa-yen-sign fa-2x"></i>
          </span>
          <p className="title is-4 mb-1">¥12,345,678</p>
          <p className="subtitle is-6">今月の売上</p>
        </div>
      </div>
      <div className="column is-3">
        <div className="box has-background-danger-light has-text-centered">
          <span className="icon is-large has-text-danger">
            <i className="fas fa-envelope-open-text fa-2x"></i>
          </span>
          <p className="title is-4 mb-1">8</p>
          <p className="subtitle is-6">未対応問い合わせ</p>
        </div>
      </div>
    </div>

    {/* アクションボタン */}
    <div className="buttons is-right mb-5">
      <button className="button is-primary is-rounded is-medium">
        <span className="icon"><i className="fas fa-plus"></i></span>
        <span>新規予約</span>
      </button>
      <button className="button is-link is-rounded is-medium">
        <span className="icon"><i className="fas fa-file-download"></i></span>
        <span>レポート出力</span>
      </button>
    </div>

    {/* お知らせ・タスクリスト */}
    <div className="columns">
      <div className="column is-6">
        <div className="box" style={{ minHeight: 220 }}>
          <p className="title is-5 mb-3"><span className="icon"><i className="fas fa-bell"></i></span> お知らせ</p>
          <ul>
            <li>・新しいツアー商品が追加されました</li>
            <li>・システムメンテナンス予定：6/30 22:00〜</li>
            <li>・顧客情報の一部が更新されました</li>
          </ul>
        </div>
      </div>
      <div className="column is-6">
        <div className="box" style={{ minHeight: 220 }}>
          <p className="title is-5 mb-3"><span className="icon"><i className="fas fa-tasks"></i></span> タスク</p>
          <ul>
            <li>・未対応の問い合わせを確認</li>
            <li>・請求書の発行作業</li>
            <li>・社員情報の更新</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard; 