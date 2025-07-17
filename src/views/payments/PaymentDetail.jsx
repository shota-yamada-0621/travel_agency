import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyPayments } from "./Payments";

const LOCAL_KEY = "localPayments";

const PaymentDetail = () => {
  const { id } = useParams();
  let payment = dummyPayments.find((p) => p.id === Number(id));
  if (!payment) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    payment = local.find((p) => p.id === Number(id));
  }

  if (!payment) return <div>支払いが見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">支払い詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {payment.id}</p>
        <p><strong>支払い番号:</strong> {payment.number}</p>
        <p><strong>請求書番号:</strong> {payment.invoice}</p>
        <p><strong>顧客名:</strong> {payment.customer}</p>
        <p><strong>金額:</strong> ¥{payment.amount.toLocaleString()}</p>
        <p><strong>支払日:</strong> {payment.paid}</p>
        <p><strong>支払方法:</strong> {payment.method}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default PaymentDetail; 