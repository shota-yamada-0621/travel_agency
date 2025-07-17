import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyPartners } from "./Partners";

const LOCAL_KEY = "localPartners";

const PartnerEdit = () => {
  const { id } = useParams();
  let ptn = dummyPartners.find((p) => p.id === Number(id));
  if (!ptn) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    ptn = local.find((p) => p.id === Number(id));
  }
  const [number, setNumber] = useState(ptn?.number || "");
  const [name, setName] = useState(ptn?.name || "");
  const [manager, setManager] = useState(ptn?.manager || "");
  const [phone, setPhone] = useState(ptn?.phone || "");
  const [email, setEmail] = useState(ptn?.email || "");
  const [address, setAddress] = useState(ptn?.address || "");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((p) => p.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], number, name, manager, phone, email, address };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    }
    // dummyPartnersは編集しない
    navigate("../");
  };

  if (!ptn) return <div>取引先が見つかりません</div>;

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">取引先編集</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">取引先番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={number} onChange={e => setNumber(e.target.value)} required placeholder="取引先番号を入力" />
                <span className="icon is-left"><i className="fas fa-id-badge"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">名称</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="名称を入力" />
                <span className="icon is-left"><i className="fas fa-building"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">担当者</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={manager} onChange={e => setManager(e.target.value)} required placeholder="担当者を入力" />
                <span className="icon is-left"><i className="fas fa-user-tie"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">電話番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="電話番号を入力" />
                <span className="icon is-left"><i className="fas fa-phone"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">メールアドレス</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="メールアドレスを入力" />
                <span className="icon is-left"><i className="fas fa-envelope"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">住所</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={address} onChange={e => setAddress(e.target.value)} required placeholder="住所を入力" />
                <span className="icon is-left"><i className="fas fa-map-marker-alt"></i></span>
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

export default PartnerEdit; 