import React from "react";
import { useParams, Link } from "react-router-dom";

const dummyCustomers = [
  { id: 1, name: "山田 太郎", email: "taro@example.com" },
  { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
];

const CustomerDetail = () => {
  const { id } = useParams();
  const customer = dummyCustomers.find((c) => c.id === Number(id));

  if (!customer) return <div>顧客が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">顧客詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {customer.id}</p>
        <p><strong>名前:</strong> {customer.name}</p>
        <p><strong>メールアドレス:</strong> {customer.email}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default CustomerDetail; 