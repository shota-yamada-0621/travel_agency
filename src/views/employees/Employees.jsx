import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeDetail from "./EmployeeDetail";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeDelete from "./EmployeeDelete";

export const dummyEmployees = [
  { id: 1, number: "EMP-001", name: "山田 太郎", position: "営業", email: "taro@example.com", phone: "03-1111-1111", joined: "2022-04-01" },
  { id: 2, number: "EMP-002", name: "佐藤 花子", position: "企画", email: "hanako@example.com", phone: "03-2222-2222", joined: "2021-10-15" },
  { id: 3, number: "EMP-003", name: "鈴木 次郎", position: "経理", email: "jiro@example.com", phone: "03-3333-3333", joined: "2020-07-20" },
  { id: 4, number: "EMP-004", name: "高橋 三郎", position: "管理", email: "saburo@example.com", phone: "03-4444-4444", joined: "2019-01-10" },
  { id: 5, number: "EMP-005", name: "田中 四郎", position: "営業", email: "shiro@example.com", phone: "03-5555-5555", joined: "2023-02-01" },
];

const LOCAL_KEY = "localEmployees";

const EmployeeList = () => {
  const [localEmployees, setLocalEmployees] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalEmployees(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">従業員一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規従業員登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>従業員番号</th>
            <th>氏名</th>
            <th>役職</th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>入社日</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.number}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.joined}</td>
              <td>
                <Link to={`${emp.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${emp.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${emp.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localEmployees.map((emp) => (
            <tr key={emp.id} style={{ background: "#f6fff6" }}>
              <td>{emp.id}</td>
              <td>{emp.number}</td>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.joined}</td>
              <td>
                <Link to={`${emp.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${emp.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${emp.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Employees = () => {
  return (
    <Routes>
      <Route index element={<EmployeeList />} />
      <Route path="create" element={<EmployeeCreate />} />
      <Route path=":id" element={<EmployeeDetail />} />
      <Route path=":id/edit" element={<EmployeeEdit />} />
      <Route path=":id/delete" element={<EmployeeDelete />} />
    </Routes>
  );
};

export default Employees; 