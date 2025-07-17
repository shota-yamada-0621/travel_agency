import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyTransports } from "./Transports";
import { dummyTours } from "../tours/Tours";

const LOCAL_KEY = "localTransports";

const TransportDetail = () => {
  const { id } = useParams();
  let transport = dummyTransports.find((t) => t.id === Number(id));
  if (!transport) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    transport = local.find((t) => t.id === Number(id));
  }

  // サンプル＋ローカルストレージのツアーを統合
  const localTours = JSON.parse(localStorage.getItem("localTours") || "[]");
  const allTours = [...dummyTours, ...localTours.filter(lt => !dummyTours.some(dt => dt.id === lt.id))];

  if (!transport) return <div>交通手段が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">交通手段詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {transport.id}</p>
        <p><strong>交通手段名:</strong> {transport.name}</p>
        <p><strong>種別:</strong> {transport.type}</p>
        <p><strong>連絡先:</strong> {transport.contact}</p>
        <p><strong>座席数:</strong> {transport.seats}</p>
        <p><strong>関連ツアー:</strong> {transport.tours && transport.tours.map(tid => {
          const t = allTours.find(t => t.id === tid);
          return t ? <span key={tid} className="tag is-info is-light mr-1">{t.name}</span> : null;
        })}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default TransportDetail; 