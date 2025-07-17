import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyEmployees } from "./Employees";

const LOCAL_KEY = "localEmployees";

const EmployeeEdit = () => {
  const { id } = useParams();
  let emp = dummyEmployees.find((e) => e.id === Number(id));
  if (!emp) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    emp = local.find((e) => e.id === Number(id));
  }
  const [number, setNumber] = useState(emp?.number || "");
  const [name, setName] = useState(emp?.name || "");
  const [position, setPosition] = useState(emp?.position || "");
  const [email, setEmail] = useState(emp?.email || "");
  const [phone, setPhone] = useState(emp?.phone || "");
  const [joined, setJoined] = useState(emp?.joined || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((e) => e.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], number, name, position, email, phone, joined };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    }
    // dummyEmployeesは編集しない
    navigate("../");
  };

  if (!emp) return <div>従業員が見つかりません</div>;

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">従業員編集</h2>
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
                <span className="icon"><i className="fas fa-save"></i></span>
                <span>保存</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit; 