import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";
import { dummyPayments } from "./Payments";

const LOCAL_KEY = "localPayments";

const PaymentCreate = () => {
  const [number, setNumber] = useState("");
  const [invoice, setInvoice] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [paid, setPaid] = useState("");
  const [method, setMethod] = useState("銀行振込");
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(p => p.id)) + 1 : 1001;
    const newPayment = { id: newId, number, invoice, customer, amount: Number(amount), paid, method };
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newPayment]));
    showSnackbar("支払いを登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規支払い登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">支払い番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={number} onChange={e => setNumber(e.target.value)} required placeholder="支払い番号を入力" />
                <span className="icon is-left"><i className="fas fa-file-invoice-dollar"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">請求書番号</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={invoice} onChange={e => setInvoice(e.target.value)} required placeholder="請求書番号を入力" />
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
              <label className="label is-large">支払日</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={paid} onChange={e => setPaid(e.target.value)} required />
                <span className="icon is-left"><i className="fas fa-calendar-alt"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">支払方法</label>
              <div className="control">
                <div className="select is-large is-rounded" style={{ width: "100%" }}>
                  <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: "100%" }}>
                    <option value="銀行振込">銀行振込</option>
                    <option value="クレジットカード">クレジットカード</option>
                    <option value="現金">現金</option>
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

export default PaymentCreate; 