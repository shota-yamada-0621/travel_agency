import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyPartners } from "./Partners";

const LOCAL_KEY = "localPartners";

const PartnerDetail = () => {
  const { id } = useParams();
  let ptn = dummyPartners.find((p) => p.id === Number(id));
  if (!ptn) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    ptn = local.find((p) => p.id === Number(id));
  }

  if (!ptn) return <div>取引先が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">取引先詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {ptn.id}</p>
        <p><strong>取引先番号:</strong> {ptn.number}</p>
        <p><strong>名称:</strong> {ptn.name}</p>
        <p><strong>担当者:</strong> {ptn.manager}</p>
        <p><strong>電話番号:</strong> {ptn.phone}</p>
        <p><strong>メールアドレス:</strong> {ptn.email}</p>
        <p><strong>住所:</strong> {ptn.address}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default PartnerDetail; 