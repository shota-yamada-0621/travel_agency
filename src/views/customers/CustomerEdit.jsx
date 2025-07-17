import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyCustomers = [
  { id: 1, name: "山田 太郎", email: "taro@example.com" },
  { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
];

const CustomerEdit = () => {
  const { id } = useParams();
  const customer = dummyCustomers.find((c) => c.id === Number(id));
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでlocalStorage保存予定
    navigate("../");
  };

  if (!customer) return <div>顧客が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">顧客編集</h2>
      <form onSubmit={handleSubmit} className="box" style={{ maxWidth: 400 }}>
        <div className="field">
          <label className="label">名前</label>
          <div className="control">
            <input className="input" value={name} onChange={e => setName(e.target.value)} required />
          </div>
        </div>
        <div className="field">
          <label className="label">メールアドレス</label>
          <div className="control">
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>
        <button className="button is-primary" type="submit">保存</button>
      </form>
    </div>
  );
};

export default CustomerEdit; 