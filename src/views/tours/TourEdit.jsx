import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyTours } from "./Tours";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localTours";

const TourEdit = () => {
  const { id } = useParams();
  let tour = dummyTours.find((t) => t.id === Number(id));
  if (!tour) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    tour = local.find((t) => t.id === Number(id));
  }
  const [name, setName] = useState(tour?.name || "");
  const [price, setPrice] = useState(tour?.price || "");
  const [status, setStatus] = useState(tour?.status || "販売中");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((t) => t.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], name, price: Number(price), status };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
      showSnackbar("ツアーを編集しました", "is-success");
    }
    navigate("../");
  };

  if (!tour) return <div>ツアーが見つかりません</div>;

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-6-tablet is-5-desktop is-4-widescreen">
        <div className="box" style={{ borderRadius: "1.5rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">ツアー編集</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">ツアー名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="ツアー名を入力" />
                <span className="icon is-left"><i className="fas fa-map-marked-alt"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">価格</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="number" min="0" value={price} onChange={e => setPrice(e.target.value)} required placeholder="価格を入力" />
                <span className="icon is-left"><i className="fas fa-yen-sign"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">ステータス</label>
              <div className="control">
                <div className="select is-large is-rounded">
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="販売中">販売中</option>
                    <option value="販売停止">販売停止</option>
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

export default TourEdit; 