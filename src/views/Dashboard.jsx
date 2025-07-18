import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { generateDummyInvoices } from "./invoices/Invoices";

// 各CRUDのデータを取得するヘルパー関数
const getCustomersData = () => {
  const localCustomers = JSON.parse(localStorage.getItem("localCustomers") || "[]");
  const dummyCustomers = [
    { id: 1, name: "山田 太郎", email: "taro@example.com" },
    { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
    { id: 3, name: "鈴木 次郎", email: "jiro@example.com" },
    { id: 4, name: "高橋 三郎", email: "saburo@example.com" },
    { id: 5, name: "田中 四郎", email: "shiro@example.com" },
    { id: 6, name: "伊藤 五郎", email: "goro@example.com" },
    { id: 7, name: "渡辺 六子", email: "rokuko@example.com" },
    { id: 8, name: "中村 七美", email: "nanami@example.com" },
    { id: 9, name: "小林 八郎", email: "hachiro@example.com" },
    { id: 10, name: "加藤 九子", email: "kyuko@example.com" },
    { id: 11, name: "吉田 十郎", email: "juro@example.com" },
    { id: 12, name: "山本 十一", email: "juichi@example.com" },
    { id: 13, name: "斎藤 十二", email: "juni@example.com" },
    { id: 14, name: "松本 十三", email: "jusan@example.com" },
    { id: 15, name: "井上 十四", email: "jushi@example.com" },
    { id: 16, name: "木村 十五", email: "jugou@example.com" },
    { id: 17, name: "林 十六", email: "juroku@example.com" },
    { id: 18, name: "清水 十七", email: "junana@example.com" },
    { id: 19, name: "山崎 十八", email: "juhachi@example.com" },
    { id: 20, name: "森 十九", email: "juku@example.com" }
  ];
  return [...dummyCustomers, ...localCustomers];
};

const getReservationsData = () => {
  const localReservations = JSON.parse(localStorage.getItem("localReservations") || "[]");
  const dummyReservations = [
    { id: 1, name: "山田 太郎", date: "2024-07-01", status: "確定", tourId: 1 },
    { id: 2, name: "佐藤 花子", date: "2024-07-02", status: "仮予約", tourId: 2 },
    { id: 3, name: "鈴木 次郎", date: "2024-07-03", status: "確定", tourId: 3 },
    { id: 4, name: "高橋 三郎", date: "2024-07-04", status: "キャンセル", tourId: 4 },
    { id: 5, name: "田中 四郎", date: "2024-07-05", status: "確定", tourId: 5 },
    { id: 6, name: "伊藤 五郎", date: "2024-07-06", status: "仮予約", tourId: 1 },
    { id: 7, name: "渡辺 六子", date: "2024-07-07", status: "確定", tourId: 2 },
    { id: 8, name: "中村 七美", date: "2024-07-08", status: "確定", tourId: 3 },
    { id: 9, name: "小林 八郎", date: "2024-07-09", status: "キャンセル", tourId: 4 },
    { id: 10, name: "加藤 九子", date: "2024-07-10", status: "確定", tourId: 5 },
    { id: 11, name: "吉田 十郎", date: "2024-07-11", status: "確定", tourId: 1 },
    { id: 12, name: "山本 十一", date: "2024-07-12", status: "仮予約", tourId: 2 },
    { id: 13, name: "斎藤 十二", date: "2024-07-13", status: "確定", tourId: 3 },
    { id: 14, name: "松本 十三", date: "2024-07-14", status: "確定", tourId: 4 },
    { id: 15, name: "井上 十四", date: "2024-07-15", status: "キャンセル", tourId: 5 },
    { id: 16, name: "木村 十五", date: "2024-07-16", status: "確定", tourId: 1 },
    { id: 17, name: "林 十六", date: "2024-07-17", status: "仮予約", tourId: 2 },
    { id: 18, name: "清水 十七", date: "2024-07-18", status: "確定", tourId: 3 },
    { id: 19, name: "山崎 十八", date: "2024-07-19", status: "確定", tourId: 4 },
    { id: 20, name: "森 十九", date: "2024-07-20", status: "確定", tourId: 5 }
  ];
  return [...dummyReservations, ...localReservations];
};

const getToursData = () => {
  const localTours = JSON.parse(localStorage.getItem("localTours") || "[]");
  const dummyTours = [
    { id: 1, name: "沖縄3日間ツアー", price: 120000, duration: "3日間", destination: "沖縄", status: "販売中" },
    { id: 2, name: "北海道5日間ツアー", price: 180000, duration: "5日間", destination: "北海道", status: "販売中" },
    { id: 3, name: "京都2日間ツアー", price: 80000, duration: "2日間", destination: "京都", status: "販売中" },
    { id: 4, name: "九州4日間ツアー", price: 150000, duration: "4日間", destination: "九州", status: "販売中" },
    { id: 5, name: "東北3日間ツアー", price: 100000, duration: "3日間", destination: "東北", status: "販売中" }
  ];
  return [...dummyTours, ...localTours];
};

const getHotelsData = () => {
  const localHotels = JSON.parse(localStorage.getItem("localHotels") || "[]");
  const dummyHotels = [
    { id: 1, name: "沖縄リゾートホテル", location: "沖縄", rooms: 150, rating: 4.5 },
    { id: 2, name: "北海道温泉旅館", location: "北海道", rooms: 80, rating: 4.8 },
    { id: 3, name: "京都和風ホテル", location: "京都", rooms: 60, rating: 4.3 },
    { id: 4, name: "九州ビジネスホテル", location: "九州", rooms: 120, rating: 4.0 },
    { id: 5, name: "東北温泉ホテル", location: "東北", rooms: 90, rating: 4.6 }
  ];
  return [...dummyHotels, ...localHotels];
};

const getTransportsData = () => {
  const localTransports = JSON.parse(localStorage.getItem("localTransports") || "[]");
  const dummyTransports = [
    { id: 1, type: "飛行機", company: "ANA", route: "東京-沖縄", capacity: 180 },
    { id: 2, type: "新幹線", company: "JR東日本", route: "東京-北海道", capacity: 1000 },
    { id: 3, type: "バス", company: "日本交通", route: "東京-京都", capacity: 45 },
    { id: 4, type: "フェリー", company: "九州フェリー", route: "福岡-長崎", capacity: 500 },
    { id: 5, type: "レンタカー", company: "トヨタレンタリース", route: "東北エリア", capacity: 50 }
  ];
  return [...dummyTransports, ...localTransports];
};

const getInvoicesData = () => {
  const localInvoices = JSON.parse(localStorage.getItem("localInvoices") || "[]");
  // 請求書管理で使用しているテストデータを取得（localStorageから）
  const dummyInvoices = JSON.parse(localStorage.getItem("dummyInvoices") || "[]");
  return [...dummyInvoices, ...localInvoices];
};

const getPaymentsData = () => {
  const localPayments = JSON.parse(localStorage.getItem("localPayments") || "[]");
  const dummyPayments = [
    { id: 1, number: "PAY-2024001", invoice: "INV-2024001", customer: "山田 太郎", amount: 120000, paid: "2024-06-10", method: "銀行振込" },
    { id: 2, number: "PAY-2024002", invoice: "INV-2024002", customer: "佐藤 花子", amount: 98000, paid: "2024-06-12", method: "クレジットカード" },
    { id: 3, number: "PAY-2024003", invoice: "INV-2024003", customer: "鈴木 次郎", amount: 75000, paid: "2024-06-13", method: "現金" },
    { id: 4, number: "PAY-2024004", invoice: "INV-2024004", customer: "高橋 三郎", amount: 88000, paid: "2024-06-14", method: "銀行振込" },
    { id: 5, number: "PAY-2024005", invoice: "INV-2024005", customer: "田中 四郎", amount: 65000, paid: "2024-06-15", method: "クレジットカード" }
  ];
  return [...dummyPayments, ...localPayments];
};

const getEmployeesData = () => {
  const localEmployees = JSON.parse(localStorage.getItem("localEmployees") || "[]");
  const dummyEmployees = [
    { id: 1, name: "山田太郎", position: "営業部長", department: "営業部", status: "在職" },
    { id: 2, name: "佐藤花子", position: "ツアー企画", department: "企画部", status: "在職" },
    { id: 3, name: "鈴木一郎", position: "カスタマーサポート", department: "サポート部", status: "在職" },
    { id: 4, name: "高橋美咲", position: "経理", department: "経理部", status: "在職" },
    { id: 5, name: "渡辺健太", position: "システム管理者", department: "IT部", status: "在職" }
  ];
  return [...dummyEmployees, ...localEmployees];
};

const getPartnersData = () => {
  const localPartners = JSON.parse(localStorage.getItem("localPartners") || "[]");
  const dummyPartners = [
    { id: 1, number: "PTN-001", name: "日本交通株式会社", manager: "佐藤 一郎" },
    { id: 2, number: "PTN-002", name: "ホテル富士", manager: "山本 花子" },
    { id: 3, number: "PTN-003", name: "ANA", manager: "田中 次郎" },
    { id: 4, number: "PTN-004", name: "JTB", manager: "高橋 三郎" },
    { id: 5, number: "PTN-005", name: "東日本鉄道株式会社", manager: "鈴木 四郎" }
  ];
  return [...dummyPartners, ...localPartners];
};

const getInquiriesData = () => {
  const localInquiries = JSON.parse(localStorage.getItem("inquiries") || "[]");
  const dummyInquiries = [
    { id: 1, title: "ツアーの予約について", status: "未対応", priority: "高" },
    { id: 2, title: "キャンセルポリシーについて", status: "対応中", priority: "中" },
    { id: 3, title: "ホテルの変更希望", status: "未対応", priority: "高" },
    { id: 4, title: "料金についての質問", status: "完了", priority: "中" },
    { id: 5, title: "海外旅行の保険について", status: "完了", priority: "低" }
  ];
  return [...dummyInquiries, ...localInquiries];
};

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // 各データを取得して統計を計算
    const customers = getCustomersData();
    const reservations = getReservationsData();
    const tours = getToursData();
    const hotels = getHotelsData();
    const transports = getTransportsData();
    const invoices = getInvoicesData();
    const payments = getPaymentsData();
    const employees = getEmployeesData();
    const partners = getPartnersData();
    const inquiries = getInquiriesData();

    // 売上計算（予約データからツアー料金を取得）
    const totalRevenue = reservations.reduce((sum, reservation) => {
      // 予約にtourPriceが直接含まれている場合
      if (reservation.tourPrice) {
        return sum + reservation.tourPrice;
      }
      
      // 予約にtourIdが含まれている場合、対応するツアーの料金を取得
      if (reservation.tourId) {
        const tour = tours.find(t => t.id === reservation.tourId);
        return sum + (tour ? tour.price : 0);
      }
      
      // テストデータの場合は、ランダムなツアー料金を割り当て（実際の運用では適切なマッピングが必要）
      // ここでは簡易的にテストデータの予約には平均的な料金を割り当て
      const averageTourPrice = tours.length > 0 
        ? tours.reduce((sum, tour) => sum + tour.price, 0) / tours.length 
        : 0;
      
      return sum + averageTourPrice;
    }, 0);

    // 未払い請求書の合計
    const unpaidInvoices = invoices
      .filter(inv => inv.status === "未払い")
      .reduce((sum, inv) => sum + inv.amount, 0);

    // 予約状況の分析
    const confirmedReservations = reservations.filter(r => r.status === "確定").length;
    const pendingReservations = reservations.filter(r => r.status === "仮予約").length;
    const cancelledReservations = reservations.filter(r => r.status === "キャンセル").length;

    // 問い合わせ状況
    const pendingInquiries = inquiries.filter(i => i.status === "未対応").length;
    const inProgressInquiries = inquiries.filter(i => i.status === "対応中").length;
    const completedInquiries = inquiries.filter(i => i.status === "完了").length;

    setStats({
      totalCustomers: customers.length,
      totalReservations: reservations.length,
      totalRevenue,
      unpaidInvoices,
      totalTours: tours.length,
      totalHotels: hotels.length,
      totalTransports: transports.length,
      totalEmployees: employees.length,
      totalPartners: partners.length,
      confirmedReservations,
      pendingReservations,
      cancelledReservations,
      pendingInquiries,
      inProgressInquiries,
      completedInquiries
    });
  }, []);

  // 円グラフ用のデータ
  const reservationStatusData = [
    { label: "確定", value: stats.confirmedReservations, color: "#48c774" },
    { label: "仮予約", value: stats.pendingReservations, color: "#ffdd57" },
    { label: "キャンセル", value: stats.cancelledReservations, color: "#f14668" }
  ];

  const inquiryStatusData = [
    { label: "未対応", value: stats.pendingInquiries, color: "#f14668" },
    { label: "対応中", value: stats.inProgressInquiries, color: "#ffdd57" },
    { label: "完了", value: stats.completedInquiries, color: "#48c774" }
  ];

  // 簡易円グラフコンポーネント
  const PieChart = ({ data, title }) => (
    <div className="box">
      <h3 className="title is-5 mb-4">{title}</h3>
      <div className="columns is-multiline">
        {data.map((item, index) => (
          <div key={index} className="column is-4">
            <div className="has-text-centered">
              <div 
                className="box" 
                style={{ 
                  background: item.color, 
                  color: 'white',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <span className="title is-4 has-text-white">{item.value}</span>
                <span className="subtitle is-6 has-text-white">{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 最近のアクティビティ
  const recentActivities = [
    { type: "予約", message: "田中太郎様が沖縄3日間ツアーを予約", time: "2時間前", color: "is-info" },
    { type: "支払い", message: "佐藤花子様の支払いが完了", time: "4時間前", color: "is-success" },
    { type: "問い合わせ", message: "新しい問い合わせが届きました", time: "6時間前", color: "is-warning" },
    { type: "ツアー", message: "新しいツアー商品が追加されました", time: "1日前", color: "is-primary" }
  ];

  return (
    <div className="container mx-auto p-4">
      {/* ヒーローセクション */}
      <div className="box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="title has-text-white mb-0">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-chart-line"></i>
                </span>
                <span>旅行会社管理ダッシュボード</span>
              </span>
            </h1>
            <p className="subtitle has-text-white is-6 mt-2">
              統計と分析結果
            </p>
          </div>
          <div className="column is-narrow">
            <div className="buttons">
              <Link to="/customers" className="button is-white is-outlined">
                <span className="icon">
                  <i className="fas fa-users"></i>
                </span>
                <span>顧客管理</span>
              </Link>
              <Link to="/reservations" className="button is-white is-outlined">
                <span className="icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <span>予約管理</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 主要統計カード */}
      <div className="columns is-multiline mb-5">
        <div className="column is-3">
          <div className="box has-background-info-light">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-narrow">
                <span className="icon is-large has-text-info">
                  <i className="fas fa-users"></i>
                </span>
              </div>
              <div className="column">
                <p className="title is-4 mb-1">{stats.totalCustomers || 0}</p>
                <p className="subtitle is-6">総顧客数</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-3">
          <div className="box has-background-warning-light">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-narrow">
                <span className="icon is-large has-text-warning">
                  <i className="fas fa-calendar-check"></i>
                </span>
              </div>
              <div className="column">
                <p className="title is-4 mb-1">{stats.totalReservations || 0}</p>
                <p className="subtitle is-6">総予約数</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-3">
          <div className="box has-background-success-light">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-narrow">
                <span className="icon is-large has-text-success">
                  <i className="fas fa-yen-sign"></i>
                </span>
              </div>
              <div className="column">
                <p className="title is-4 mb-1">¥{(stats.totalRevenue || 0).toLocaleString()}</p>
                <p className="subtitle is-6">総売上</p>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-3">
          <div className="box has-background-danger-light">
            <div className="columns is-mobile is-vcentered">
              <div className="column is-narrow">
                <span className="icon is-large has-text-danger">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <div className="column">
                <p className="title is-4 mb-1">¥{(stats.unpaidInvoices || 0).toLocaleString()}</p>
                <p className="subtitle is-6">未払い請求書</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 詳細統計 */}
      <div className="columns is-multiline mb-5">
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-primary">
              <i className="fas fa-plane"></i>
            </span>
            <p className="title is-5">{stats.totalTours || 0}</p>
            <p className="subtitle is-7">ツアー商品</p>
          </div>
        </div>
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-link">
              <i className="fas fa-hotel"></i>
            </span>
            <p className="title is-5">{stats.totalHotels || 0}</p>
            <p className="subtitle is-7">提携ホテル</p>
          </div>
        </div>
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-info">
              <i className="fas fa-bus"></i>
            </span>
            <p className="title is-5">{stats.totalTransports || 0}</p>
            <p className="subtitle is-7">交通手段</p>
          </div>
        </div>
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-success">
              <i className="fas fa-user-tie"></i>
            </span>
            <p className="title is-5">{stats.totalEmployees || 0}</p>
            <p className="subtitle is-7">従業員数</p>
          </div>
        </div>
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-warning">
              <i className="fas fa-handshake"></i>
            </span>
            <p className="title is-5">{stats.totalPartners || 0}</p>
            <p className="subtitle is-7">取引先</p>
          </div>
        </div>
        <div className="column is-2">
          <div className="box has-text-centered">
            <span className="icon is-large has-text-danger">
              <i className="fas fa-envelope"></i>
            </span>
            <p className="title is-5">{stats.pendingInquiries || 0}</p>
            <p className="subtitle is-7">未対応問い合わせ</p>
          </div>
        </div>
      </div>

      {/* グラフと分析 */}
      <div className="columns is-multiline mb-5">
        <div className="column is-6">
          <PieChart data={reservationStatusData} title="予約状況" />
        </div>
        <div className="column is-6">
          <PieChart data={inquiryStatusData} title="問い合わせ対応状況" />
        </div>
      </div>

      {/* 最近のアクティビティとクイックアクション */}
      <div className="columns">
        <div className="column is-8">
          <div className="box">
            <h3 className="title is-5 mb-4">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-history"></i>
                </span>
                <span>最近のアクティビティ</span>
              </span>
            </h3>
            <div className="content">
              {recentActivities.map((activity, index) => (
                <div key={index} className="columns is-mobile is-vcentered mb-3">
                  <div className="column is-narrow">
                    <span className={`tag ${activity.color}`}>
                      {activity.type}
                    </span>
                  </div>
                  <div className="column">
                    <p className="mb-1">{activity.message}</p>
                    <small className="has-text-grey">{activity.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="column is-4">
          <div className="box">
            <h3 className="title is-5 mb-4">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-bolt"></i>
                </span>
                <span>クイックアクション</span>
              </span>
            </h3>
            <div className="buttons is-vertical">
              <Link to="/reservations/create" className="button is-primary is-fullwidth">
                <span className="icon">
                  <i className="fas fa-plus"></i>
                </span>
                <span>新規予約作成</span>
              </Link>
              <Link to="/customers/create" className="button is-info is-fullwidth">
                <span className="icon">
                  <i className="fas fa-user-plus"></i>
                </span>
                <span>新規顧客登録</span>
              </Link>
              <Link to="/inquiries" className="button is-warning is-fullwidth">
                <span className="icon">
                  <i className="fas fa-envelope"></i>
                </span>
                <span>問い合わせ確認</span>
              </Link>
              <Link to="/invoices" className="button is-danger is-fullwidth">
                <span className="icon">
                  <i className="fas fa-file-invoice"></i>
                </span>
                <span>請求書管理</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 