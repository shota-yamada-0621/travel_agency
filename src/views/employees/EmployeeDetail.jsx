import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyEmployees } from "./Employees";

const LOCAL_KEY = "localEmployees";

const EmployeeDetail = () => {
  const { id } = useParams();
  let emp = dummyEmployees.find((e) => e.id === Number(id));
  if (!emp) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    emp = local.find((e) => e.id === Number(id));
  }

  if (!emp) return <div>従業員が見つかりません</div>;

  return (
    <div>
      <h2 className="title is-4">従業員詳細</h2>
      <div className="box">
        <p><strong>ID:</strong> {emp.id}</p>
        <p><strong>従業員番号:</strong> {emp.number}</p>
        <p><strong>氏名:</strong> {emp.name}</p>
        <p><strong>役職:</strong> {emp.position}</p>
        <p><strong>メールアドレス:</strong> {emp.email}</p>
        <p><strong>電話番号:</strong> {emp.phone}</p>
        <p><strong>入社日:</strong> {emp.joined}</p>
      </div>
      <Link to="../" className="button is-light">一覧に戻る</Link>
    </div>
  );
};

export default EmployeeDetail; 