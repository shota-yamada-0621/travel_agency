import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyTours } from "./Tours";

const LOCAL_KEY = "localTours";

const TourDetail = () => {
  const { id } = useParams();
  let tour = dummyTours.find((t) => t.id === Number(id));
  if (!tour) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    tour = local.find((t) => t.id === Number(id));
  }

  if (!tour) return <div>ツアーが見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">ツアー詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {tour.id}</p>
        <p><strong>ツアー名:</strong> {tour.name}</p>
        <p><strong>価格:</strong> ¥{tour.price.toLocaleString()}</p>
        <p><strong>ステータス:</strong> {tour.status}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default TourDetail; 