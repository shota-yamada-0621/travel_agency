import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localReservations";

const ReservationCreate = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("確定");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(r => r.id)) + 1 : 1001;
    const newReservation = { id: newId, name, date, status };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newReservation]));
    showSnackbar("予約を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-6-tablet is-5-desktop is-4-widescreen">
        <div className="box" style={{ borderRadius: "1.5rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規予約登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">顧客名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="顧客名を入力" />
                <span className="icon is-left"><i className="fas fa-user"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">日付</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                <span className="icon is-left"><i className="fas fa-calendar"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">ステータス</label>
              <div className="control">
                <div className="select is-large is-rounded">
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="確定">確定</option>
                    <option value="仮予約">仮予約</option>
                    <option value="キャンセル">キャンセル</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="has-text-centered">
              <button className="button is-primary is-large is-rounded has-text-weight-bold px-6" type="submit">
                <span className="icon"><i className="fas fa-calendar-plus"></i></span>
                <span>登録</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationCreate; 