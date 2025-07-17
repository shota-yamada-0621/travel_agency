import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import ReservationCreate from "./ReservationCreate";
import ReservationDetail from "./ReservationDetail";
import ReservationEdit from "./ReservationEdit";
import ReservationDelete from "./ReservationDelete";

export const dummyReservations = [
  { id: 1, name: "山田 太郎", date: "2024-07-01", status: "確定" },
  { id: 2, name: "佐藤 花子", date: "2024-07-02", status: "仮予約" },
  { id: 3, name: "鈴木 次郎", date: "2024-07-03", status: "確定" },
  { id: 4, name: "高橋 三郎", date: "2024-07-04", status: "キャンセル" },
  { id: 5, name: "田中 四郎", date: "2024-07-05", status: "確定" },
  { id: 6, name: "伊藤 五郎", date: "2024-07-06", status: "仮予約" },
  { id: 7, name: "渡辺 六子", date: "2024-07-07", status: "確定" },
  { id: 8, name: "中村 七美", date: "2024-07-08", status: "確定" },
  { id: 9, name: "小林 八郎", date: "2024-07-09", status: "キャンセル" },
  { id: 10, name: "加藤 九子", date: "2024-07-10", status: "確定" },
  { id: 11, name: "吉田 十郎", date: "2024-07-11", status: "確定" },
  { id: 12, name: "山本 十一", date: "2024-07-12", status: "仮予約" },
  { id: 13, name: "斎藤 十二", date: "2024-07-13", status: "確定" },
  { id: 14, name: "松本 十三", date: "2024-07-14", status: "確定" },
  { id: 15, name: "井上 十四", date: "2024-07-15", status: "キャンセル" },
  { id: 16, name: "木村 十五", date: "2024-07-16", status: "確定" },
  { id: 17, name: "林 十六", date: "2024-07-17", status: "仮予約" },
  { id: 18, name: "清水 十七", date: "2024-07-18", status: "確定" },
  { id: 19, name: "山崎 十八", date: "2024-07-19", status: "確定" },
  { id: 20, name: "森 十九", date: "2024-07-20", status: "確定" },
];

const LOCAL_KEY = "localReservations";

const statusTag = (status) => {
  if (status === "確定") return <span className="tag is-success-light has-text-success is-medium">{status}</span>;
  if (status === "仮予約") return <span className="tag is-warning-light has-text-warning is-medium">{status}</span>;
  if (status === "キャンセル") return <span className="tag is-danger-light has-text-danger is-medium">{status}</span>;
  return <span className="tag is-light is-medium">{status}</span>;
};

const ReservationList = () => {
  const [localReservations, setLocalReservations] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalReservations(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">予約一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規予約登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>顧客名</th>
            <th>日付</th>
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyReservations.map((rsv) => (
            <tr key={rsv.id}>
              <td>{rsv.id}</td>
              <td>{rsv.name}</td>
              <td>{rsv.date}</td>
              <td>{statusTag(rsv.status)}</td>
              <td>
                <Link to={`${rsv.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${rsv.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${rsv.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localReservations.map((rsv) => (
            <tr key={rsv.id} style={{ background: "#f6fff6" }}>
              <td>{rsv.id}</td>
              <td>{rsv.name}</td>
              <td>{rsv.date}</td>
              <td>{statusTag(rsv.status)}</td>
              <td>
                <Link to={`${rsv.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${rsv.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${rsv.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Reservations = () => {
  return (
    <Routes>
      <Route index element={<ReservationList />} />
      <Route path="create" element={<ReservationCreate />} />
      <Route path=":id" element={<ReservationDetail />} />
      <Route path=":id/edit" element={<ReservationEdit />} />
      <Route path=":id/delete" element={<ReservationDelete />} />
    </Routes>
  );
};

export default Reservations; 