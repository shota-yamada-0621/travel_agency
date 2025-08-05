import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import CustomerCreate from "./CustomerCreate";
import CustomerDetail from "./CustomerDetail";
import CustomerEdit from "./CustomerEdit";
import CustomerDelete from "./CustomerDelete";
// CsvExportButtonコンポーネントをインポート
import CsvExportButton from "../../components/CsvExportButton";

export const dummyCustomers = [
  { id: 1, name: "山田 太郎", email: "taro@example.com" },
  { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
  { id: 3, name: "鈴木 次郎", email: "jiro@example.com" },
  { id: 4, name: "高橋 三郎", email: "saburo@example.com" },
  { id: 5, name: "田中 四郎", email: "shiro@example.com" },
  { id: 6, name: "伊藤 五郎", email: "goro@example.com" },
  { id: 7, name: "渡辺 六子", email: "rokuko@example.com" },
  { id: 8, name: "中村 七美", email: "nanami@example.com" },
  { id: 9, name: "小林 八郎", email: "hachiro@example.com" },
  { id: 10, name: "加藤 九子", email: "kyuko@example.com" },
  { id: 11, name: "吉田 十郎", email: "juro@example.com" },
  { id: 12, name: "山本 十一", email: "juichi@example.com" },
  { id: 13, name: "斎藤 十二", email: "juni@example.com" },
  { id: 14, name: "松本 十三", email: "jusan@example.com" },
  { id: 15, name: "井上 十四", email: "jushi@example.com" },
  { id: 16, name: "木村 十五", email: "jugou@example.com" },
  { id: 17, name: "林 十六", email: "juroku@example.com" },
  { id: 18, name: "清水 十七", email: "junana@example.com" },
  { id: 19, name: "山崎 十八", email: "juhachi@example.com" },
  { id: 20, name: "森 十九", email: "juku@example.com" },
];

const LOCAL_KEY = "localCustomers";

const CustomerList = () => {
  const [localCustomers, setLocalCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalCustomers(local);
    // ダミー顧客とローカルストレージの顧客を結合
    setAllCustomers([...dummyCustomers, ...local]);
  }, []);

  // CSVのヘッダーを定義
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "名前", key: "name" },
    { label: "メールアドレス", key: "email" },
  ];

  return (
    <div>
      <h2 className="title is-4">顧客一覧</h2>
      <div className="field is-grouped mb-4">
        <p className="control">
          <Link to="create" className="button is-primary">新規顧客登録</Link>
        </p>
        <p className="control">
          {/* CSV出力ボタンを設置 */}
          <CsvExportButton
            data={allCustomers}
            headers={csvHeaders}
            filename="customers.csv"
            buttonText="顧客データCSV出力"
            className="button is-link"
          />
        </p>
      </div>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>メールアドレス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Link to={`${customer.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${customer.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${customer.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {/* ローカルストレージの顧客データを下に追加表示 */}
          {localCustomers.map((customer) => (
            <tr key={customer.id} style={{ background: "#f6fff6" }}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <Link to={`${customer.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${customer.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${customer.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Customers = () => {
  return (
    <Routes>
      <Route index element={<CustomerList />} />
      <Route path="create" element={<CustomerCreate />} />
      <Route path=":id" element={<CustomerDetail />} />
      <Route path=":id/edit" element={<CustomerEdit />} />
      <Route path=":id/delete" element={<CustomerDelete />} />
    </Routes>
  );
};

export default Customers;