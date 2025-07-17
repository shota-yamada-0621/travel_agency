import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";
import { dummyEmployees } from "./Employees";

const LOCAL_KEY = "localEmployees";

const EmployeeCreate = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joined, setJoined] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(emp => emp.id)) + 1 : 1001;
    const newEmployee = { id: newId, number, name, position, email, phone, joined };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newEmployee]));
    showSnackbar("従業員を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規従業員登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">従業員番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={number} onChange={e => setNumber(e.target.value)} required placeholder="従業員番号を入力" />
                <span className="icon is-left"><i className="fas fa-id-badge"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">氏名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="氏名を入力" />
                <span className="icon is-left"><i className="fas fa-user"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">役職</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={position} onChange={e => setPosition(e.target.value)} required placeholder="役職を入力" />
                <span className="icon is-left"><i className="fas fa-briefcase"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">メールアドレス</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="メールアドレスを入力" />
                <span className="icon is-left"><i className="fas fa-envelope"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">電話番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="電話番号を入力" />
                <span className="icon is-left"><i className="fas fa-phone"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">入社日</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={joined} onChange={e => setJoined(e.target.value)} required />
                <span className="icon is-left"><i className="fas fa-calendar-alt"></i></span>
              </div>
            </div>
            <div className="has-text-centered">
              <button className="button is-primary is-large is-rounded has-text-weight-bold px-6" type="submit">
                <span className="icon"><i className="fas fa-plus"></i></span>
                <span>登録</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate; 