import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyInvoices } from "./Invoices";

const LOCAL_KEY = "localInvoices";

const InvoiceEdit = () => {
  const { id } = useParams();
  let invoice = dummyInvoices.find((i) => i.id === Number(id));
  if (!invoice) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    invoice = local.find((i) => i.id === Number(id));
  }
  const [number, setNumber] = useState(invoice?.number || "");
  const [customer, setCustomer] = useState(invoice?.customer || "");
  const [amount, setAmount] = useState(invoice?.amount || "");
  const [issued, setIssued] = useState(invoice?.issued || "");
  const [status, setStatus] = useState(invoice?.status || "未払い");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((i) => i.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], number, customer, amount: Number(amount), issued, status };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    }
    // dummyInvoicesは編集しない
    navigate("../");
  };

  if (!invoice) return <div>請求書が見つかりません</div>;

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">請求書編集</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">請求書番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={number} onChange={e => setNumber(e.target.value)} required placeholder="請求書番号を入力" />
                <span className="icon is-left"><i className="fas fa-file-invoice"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">顧客名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={customer} onChange={e => setCustomer(e.target.value)} required placeholder="顧客名を入力" />
                <span className="icon is-left"><i className="fas fa-user"></i></span>
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
            <div className="field mb-6">
              <label className="label is-large">支払状況</label>
              <div className="control">
                <div className="select is-large is-rounded" style={{ width: "100%" }}>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: "100%" }}>
                    <option value="未払い">未払い</option>
                    <option value="支払い済">支払い済</option>
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

export default InvoiceEdit; 