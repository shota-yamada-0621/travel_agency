import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import PaymentCreate from "./PaymentCreate";
import PaymentDetail from "./PaymentDetail";
import PaymentEdit from "./PaymentEdit";
import PaymentDelete from "./PaymentDelete";

export const dummyPayments = [
  { id: 1, number: "PAY-2024001", invoice: "INV-2024001", customer: "山田 太郎", amount: 120000, paid: "2024-06-10", method: "銀行振込" },
  { id: 2, number: "PAY-2024002", invoice: "INV-2024002", customer: "佐藤 花子", amount: 98000, paid: "2024-06-12", method: "クレジットカード" },
  { id: 3, number: "PAY-2024003", invoice: "INV-2024003", customer: "鈴木 次郎", amount: 75000, paid: "2024-06-13", method: "現金" },
  { id: 4, number: "PAY-2024004", invoice: "INV-2024004", customer: "高橋 三郎", amount: 88000, paid: "2024-06-14", method: "銀行振込" },
  { id: 5, number: "PAY-2024005", invoice: "INV-2024005", customer: "田中 四郎", amount: 65000, paid: "2024-06-15", method: "クレジットカード" },
];

const LOCAL_KEY = "localPayments";

const PaymentList = () => {
  const [localPayments, setLocalPayments] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalPayments(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">支払い一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規支払い登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>支払い番号</th>
            <th>請求書番号</th>
            <th>顧客名</th>
            <th>金額</th>
            <th>支払日</th>
            <th>支払方法</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyPayments.map((pay) => (
            <tr key={pay.id}>
              <td>{pay.id}</td>
              <td>{pay.number}</td>
              <td>{pay.invoice}</td>
              <td>{pay.customer}</td>
              <td>¥{pay.amount.toLocaleString()}</td>
              <td>{pay.paid}</td>
              <td>{pay.method}</td>
              <td>
                <Link to={`${pay.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${pay.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${pay.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localPayments.map((pay) => (
            <tr key={pay.id} style={{ background: "#f6fff6" }}>
              <td>{pay.id}</td>
              <td>{pay.number}</td>
              <td>{pay.invoice}</td>
              <td>{pay.customer}</td>
              <td>¥{pay.amount.toLocaleString()}</td>
              <td>{pay.paid}</td>
              <td>{pay.method}</td>
              <td>
                <Link to={`${pay.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${pay.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${pay.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Payments = () => {
  return (
    <Routes>
      <Route index element={<PaymentList />} />
      <Route path="create" element={<PaymentCreate />} />
      <Route path=":id" element={<PaymentDetail />} />
      <Route path=":id/edit" element={<PaymentEdit />} />
      <Route path=":id/delete" element={<PaymentDelete />} />
    </Routes>
  );
};

export default Payments; 