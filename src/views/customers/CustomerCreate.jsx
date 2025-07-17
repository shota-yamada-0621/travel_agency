import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localCustomers";

const CustomerCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(c => c.id)) + 1 : 1001;
    const newCustomer = { id: newId, name, email };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newCustomer]));
    showSnackbar("顧客を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-6-tablet is-5-desktop is-4-widescreen">
        <div className="box" style={{ borderRadius: "1.5rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規顧客登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">名前</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="顧客名を入力" />
                <span className="icon is-left"><i className="fas fa-user"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">メールアドレス</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="メールアドレスを入力" />
                <span className="icon is-left"><i className="fas fa-envelope"></i></span>
              </div>
            </div>
            <div className="has-text-centered">
              <button className="button is-primary is-large is-rounded has-text-weight-bold px-6" type="submit">
                <span className="icon"><i className="fas fa-user-plus"></i></span>
                <span>登録</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreate; 