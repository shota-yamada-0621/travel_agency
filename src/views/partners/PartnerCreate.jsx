import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";
import { dummyPartners } from "./Partners";

const LOCAL_KEY = "localPartners";

const PartnerCreate = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(ptn => ptn.id)) + 1 : 1001;
    const newPartner = { id: newId, number, name, manager, phone, email, address };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newPartner]));
    showSnackbar("取引先を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規取引先登録</h2>
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

export default PartnerCreate; 