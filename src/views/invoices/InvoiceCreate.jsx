import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";
import { dummyInvoices } from "./Invoices";
import { getPartnersData } from "../partners/Partners";

const LOCAL_KEY = "localInvoices";

const InvoiceCreate = () => {
  const [number, setNumber] = useState("");
  const [partnerId, setPartnerId] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [issued, setIssued] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("未払い");
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setPartners(getPartnersData());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(i => i.id)) + 1 : 1001;
    
    const selectedPartner = partners.find(p => p.id === Number(partnerId));
    const newInvoice = { 
      id: newId, 
      number, 
      partnerId: Number(partnerId),
      partnerName: selectedPartner?.name || "",
      partnerNumber: selectedPartner?.number || "",
      type, 
      description,
      amount: Number(amount), 
      issued, 
      dueDate,
      status 
    };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newInvoice]));
    showSnackbar("請求書を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規請求書登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">請求書番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={number} onChange={e => setNumber(e.target.value)} required placeholder="請求書番号を入力" />
                <span className="icon is-left"><i className="fas fa-file-invoice"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">取引先</label>
              <div className="control has-icons-left">
                <div className="select is-large is-rounded" style={{ width: "100%" }}>
                  <select value={partnerId} onChange={e => setPartnerId(e.target.value)} required style={{ width: "100%" }}>
                    <option value="">取引先を選択してください</option>
                    {partners.map(partner => (
                      <option key={partner.id} value={partner.id}>
                        {partner.number} - {partner.name}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-left"><i className="fas fa-building"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">請求種別</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={type} onChange={e => setType(e.target.value)} required placeholder="請求種別を入力（例：交通費、宿泊費）" />
                <span className="icon is-left"><i className="fas fa-tag"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">請求内容の詳細</label>
              <div className="control has-icons-left">
                <textarea className="textarea is-large is-rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="請求内容の詳細を入力" rows="3" />
                <span className="icon is-left"><i className="fas fa-align-left"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">金額</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="金額を入力" />
                <span className="icon is-left"><i className="fas fa-yen-sign"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">発行日</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={issued} onChange={e => setIssued(e.target.value)} required />
                <span className="icon is-left"><i className="fas fa-calendar-alt"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">支払期限</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                <span className="icon is-left"><i className="fas fa-clock"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">支払状況</label>
              <div className="control">
                <div className="select is-large is-rounded" style={{ width: "100%" }}>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: "100%" }}>
                    <option value="未払い">未払い</option>
                    <option value="支払い済">支払い済</option>
                    <option value="支払い遅延">支払い遅延</option>
                  </select>
                </div>
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

export default InvoiceCreate; 