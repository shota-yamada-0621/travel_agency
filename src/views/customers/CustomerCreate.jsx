import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでlocalStorage保存予定
    navigate("../");
  };

  return (
    <div>
      <h2 className="title is-4">新規顧客登録</h2>
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
        <button className="button is-primary" type="submit">登録</button>
      </form>
    </div>
  );
};

export default CustomerCreate; 