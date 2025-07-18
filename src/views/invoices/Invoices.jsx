import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import InvoiceCreate from "./InvoiceCreate";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceDelete from "./InvoiceDelete";
import { getPartnersData } from "../partners/Partners";

// 取引先データを基にした請求書データ
export const generateDummyInvoices = () => {
  const partners = getPartnersData();
  const invoiceTypes = [
    { type: "交通費", description: "バス・電車運賃" },
    { type: "宿泊費", description: "ホテル宿泊代" },
    { type: "航空運賃", description: "飛行機チケット代" },
    { type: "手配手数料", description: "ツアー手配手数料" },
    { type: "鉄道運賃", description: "JR運賃" }
  ];

  return partners.map((partner, index) => {
    const invoiceType = invoiceTypes[index % invoiceTypes.length];
    const baseAmount = [120000, 98000, 75000, 88000, 65000][index % 5];
    const randomAmount = baseAmount + Math.floor(Math.random() * 50000);
    
    return {
      id: index + 1,
      number: `INV-2024${String(index + 1).padStart(3, '0')}`,
      partnerId: partner.id,
      partnerName: partner.name,
      partnerNumber: partner.number,
      type: invoiceType.type,
      description: invoiceType.description,
      amount: randomAmount,
      issued: new Date(2024, 5, index + 1).toISOString().split('T')[0],
      dueDate: new Date(2024, 6, index + 1).toISOString().split('T')[0],
      status: index % 3 === 0 ? "未払い" : index % 3 === 1 ? "支払い済" : "支払い遅延"
    };
  });
};

export const dummyInvoices = generateDummyInvoices();

const LOCAL_KEY = "localInvoices";
const DUMMY_INVOICES_KEY = "dummyInvoices";

const InvoiceList = () => {
  const [localInvoices, setLocalInvoices] = useState([]);
  const [dummyInvoicesState, setDummyInvoicesState] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalInvoices(local);
    
    // テストデータの状態をlocalStorageから取得、なければ初期化
    const savedDummyInvoices = localStorage.getItem(DUMMY_INVOICES_KEY);
    if (savedDummyInvoices) {
      setDummyInvoicesState(JSON.parse(savedDummyInvoices));
    } else {
      const initialDummyInvoices = generateDummyInvoices();
      localStorage.setItem(DUMMY_INVOICES_KEY, JSON.stringify(initialDummyInvoices));
      setDummyInvoicesState(initialDummyInvoices);
    }
  }, []);

  // テストデータのステータス変更を反映するための関数
  const updateDummyInvoiceStatus = (id, newStatus) => {
    const updatedDummyInvoices = dummyInvoicesState.map(inv => 
      inv.id === id ? { ...inv, status: newStatus } : inv
    );
    setDummyInvoicesState(updatedDummyInvoices);
    localStorage.setItem(DUMMY_INVOICES_KEY, JSON.stringify(updatedDummyInvoices));
  };

  const statusTag = (status) => {
    if (status === "支払い済") return <span className="tag is-success-light has-text-success is-medium">{status}</span>;
    if (status === "未払い") return <span className="tag is-danger-light has-text-danger is-medium">{status}</span>;
    if (status === "支払い遅延") return <span className="tag is-warning-light has-text-warning is-medium">{status}</span>;
    return <span className="tag is-light is-medium">{status}</span>;
  };

  return (
    <div>
      <h2 className="title is-4">請求書一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規請求書登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>請求書番号</th>
            <th>取引先</th>
            <th>取引先番号</th>
            <th>請求種別</th>
            <th>金額</th>
            <th>発行日</th>
            <th>支払期限</th>
            <th>支払状況</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyInvoicesState.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td><strong>{inv.number}</strong></td>
              <td>{inv.partnerName}</td>
              <td><span className="tag is-info is-light">{inv.partnerNumber}</span></td>
              <td>
                <div>
                  <strong>{inv.type}</strong>
                  <br />
                  <small className="has-text-grey">{inv.description}</small>
                </div>
              </td>
              <td><strong className="has-text-danger">¥{inv.amount.toLocaleString()}</strong></td>
              <td>{inv.issued}</td>
              <td>{inv.dueDate}</td>
              <td>{statusTag(inv.status)}</td>
              <td>
                <Link to={`${inv.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${inv.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localInvoices.map((inv) => (
            <tr key={inv.id} style={{ background: "#f6fff6" }}>
              <td>{inv.id}</td>
              <td><strong>{inv.number}</strong></td>
              <td>{inv.partnerName || inv.customer}</td>
              <td><span className="tag is-info is-light">{inv.partnerNumber || "N/A"}</span></td>
              <td>
                <div>
                  <strong>{inv.type || "一般"}</strong>
                  <br />
                  <small className="has-text-grey">{inv.description || ""}</small>
                </div>
              </td>
              <td><strong className="has-text-danger">¥{inv.amount.toLocaleString()}</strong></td>
              <td>{inv.issued}</td>
              <td>{inv.dueDate || "N/A"}</td>
              <td>{statusTag(inv.status)}</td>
              <td>
                <Link to={`${inv.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${inv.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Invoices = () => {
  return (
    <Routes>
      <Route index element={<InvoiceList />} />
      <Route path="create" element={<InvoiceCreate />} />
      <Route path=":id" element={<InvoiceDetail />} />
      <Route path=":id/delete" element={<InvoiceDelete />} />
    </Routes>
  );
};

export default Invoices; 