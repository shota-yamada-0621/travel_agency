import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyReservations } from "./Reservations";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localReservations";

const ReservationEdit = () => {
  const { id } = useParams();
  let reservation = dummyReservations.find((r) => r.id === Number(id));
  if (!reservation) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    reservation = local.find((r) => r.id === Number(id));
  }
  const [name, setName] = useState(reservation?.name || "");
  const [date, setDate] = useState(reservation?.date || "");
  const [status, setStatus] = useState(reservation?.status || "確定");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((r) => r.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], name, date, status };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
      showSnackbar("予約を編集しました", "is-success");
    }
    navigate("../");
  };

  if (!reservation) return <div>予約が見つかりません</div>;

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-6-tablet is-5-desktop is-4-widescreen">
        <div className="box" style={{ borderRadius: "1.5rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">予約編集</h2>
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

export default ReservationEdit; 