import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyReservations } from "./Reservations";

const LOCAL_KEY = "localReservations";

const ReservationDetail = () => {
  const { id } = useParams();
  let reservation = dummyReservations.find((r) => r.id === Number(id));
  if (!reservation) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    reservation = local.find((r) => r.id === Number(id));
  }

  if (!reservation) return <div>予約が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">予約詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {reservation.id}</p>
        <p><strong>顧客名:</strong> {reservation.name}</p>
        <p><strong>日付:</strong> {reservation.date}</p>
        <p><strong>ステータス:</strong> {reservation.status}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default ReservationDetail; 