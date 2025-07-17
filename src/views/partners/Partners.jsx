import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import PartnerCreate from "./PartnerCreate";
import PartnerDetail from "./PartnerDetail";
import PartnerEdit from "./PartnerEdit";
import PartnerDelete from "./PartnerDelete";

export const dummyPartners = [
  { id: 1, number: "PTN-001", name: "日本交通株式会社", manager: "佐藤 一郎", phone: "03-1111-2222", email: "ichiro@nihonkotsu.co.jp", address: "東京都千代田区1-1-1" },
  { id: 2, number: "PTN-002", name: "ホテル富士", manager: "山本 花子", phone: "03-3333-4444", email: "hanako@hotelfuji.jp", address: "東京都新宿区2-2-2" },
  { id: 3, number: "PTN-003", name: "ANA", manager: "田中 次郎", phone: "03-5555-6666", email: "jiro@ana.co.jp", address: "東京都港区3-3-3" },
  { id: 4, number: "PTN-004", name: "JTB", manager: "高橋 三郎", phone: "03-7777-8888", email: "saburo@jtb.co.jp", address: "東京都中央区4-4-4" },
  { id: 5, number: "PTN-005", name: "東日本鉄道株式会社", manager: "鈴木 四郎", phone: "03-9999-0000", email: "shiro@jr-east.co.jp", address: "東京都台東区5-5-5" },
];

// 取引先データを取得する関数
export const getPartnersData = () => {
  const localPartners = JSON.parse(localStorage.getItem("localPartners") || "[]");
  return [...dummyPartners, ...localPartners];
};

const LOCAL_KEY = "localPartners";

const PartnerList = () => {
  const [localPartners, setLocalPartners] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalPartners(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">取引先一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規取引先登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>取引先番号</th>
            <th>名称</th>
            <th>担当者</th>
            <th>電話番号</th>
            <th>メールアドレス</th>
            <th>住所</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyPartners.map((ptn) => (
            <tr key={ptn.id}>
              <td>{ptn.id}</td>
              <td>{ptn.number}</td>
              <td>{ptn.name}</td>
              <td>{ptn.manager}</td>
              <td>{ptn.phone}</td>
              <td>{ptn.email}</td>
              <td>{ptn.address}</td>
              <td>
                <Link to={`${ptn.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${ptn.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${ptn.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localPartners.map((ptn) => (
            <tr key={ptn.id} style={{ background: "#f6fff6" }}>
              <td>{ptn.id}</td>
              <td>{ptn.number}</td>
              <td>{ptn.name}</td>
              <td>{ptn.manager}</td>
              <td>{ptn.phone}</td>
              <td>{ptn.email}</td>
              <td>{ptn.address}</td>
              <td>
                <Link to={`${ptn.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${ptn.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${ptn.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Partners = () => {
  return (
    <Routes>
      <Route index element={<PartnerList />} />
      <Route path="create" element={<PartnerCreate />} />
      <Route path=":id" element={<PartnerDetail />} />
      <Route path=":id/edit" element={<PartnerEdit />} />
      <Route path=":id/delete" element={<PartnerDelete />} />
    </Routes>
  );
};

export default Partners; 