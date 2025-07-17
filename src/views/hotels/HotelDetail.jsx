import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyHotels } from "./Hotels";
import { dummyTours } from "../tours/Tours";

const LOCAL_KEY = "localHotels";

const HotelDetail = () => {
  const { id } = useParams();
  let hotel = dummyHotels.find((h) => h.id === Number(id));
  if (!hotel) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    hotel = local.find((h) => h.id === Number(id));
  }

  if (!hotel) return <div>ホテルが見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">ホテル詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {hotel.id}</p>
        <p><strong>ホテル名:</strong> {hotel.name}</p>
        <p><strong>住所:</strong> {hotel.address}</p>
        <p><strong>部屋数:</strong> {hotel.rooms}</p>
        <p><strong>連絡先:</strong> {hotel.contact}</p>
        <p><strong>関連ツアー:</strong> {hotel.tours && hotel.tours.map(tid => {
          const t = dummyTours.find(t => t.id === tid);
          return t ? <span key={tid} className="tag is-info is-light mr-1">{t.name}</span> : null;
        })}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default HotelDetail; 