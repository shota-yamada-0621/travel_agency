import React from "react";
import { Link } from "react-router-dom";

const dummyCustomers = [
  { id: 1, name: "山田 太郎", email: "taro@example.com" },
  { id: 2, name: "佐藤 花子", email: "hanako@example.com" },
];

const Customers = () => {
  return (
    <div>
      <h2 className="title is-4">顧客一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規顧客登録</Link>
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
        </tbody>
      </table>
    </div>
  );
};

export default Customers; 