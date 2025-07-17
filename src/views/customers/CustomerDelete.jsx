import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyCustomers = [
  { id: 1, name: "山田 太郎", email: "taro@example.com" },
  { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
];

const CustomerDelete = () => {
  const { id } = useParams();
  const customer = dummyCustomers.find((c) => c.id === Number(id));
  const navigate = useNavigate();

  const handleDelete = () => {
    // ここでlocalStorage削除予定
    navigate("../../");
  };

  if (!customer) return <div>顧客が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">顧客削除</h2>
      <div className="box">
        <p>本当に「{customer.name}」を削除しますか？</p>
        <button className="button is-danger mr-2" onClick={handleDelete}>削除</button>
        <button className="button" onClick={() => navigate(-1)}>キャンセル</button>
      </div>
    </div>
  );
};

export default CustomerDelete; 