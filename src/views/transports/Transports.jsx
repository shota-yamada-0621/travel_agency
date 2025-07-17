import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import TransportCreate from "./TransportCreate";
import TransportDetail from "./TransportDetail";
import TransportEdit from "./TransportEdit";
import TransportDelete from "./TransportDelete";
import { dummyTours } from "../tours/Tours";

export const dummyTransports = [
  { id: 1, name: "新幹線のぞみ1号", type: "電車", contact: "03-1234-5678", seats: 1000, tours: [1, 5] },
  { id: 2, name: "ANA123便", type: "飛行機", contact: "0120-222-333", seats: 300, tours: [2, 8] },
  { id: 3, name: "観光バスA", type: "バス", contact: "06-4444-5555", seats: 45, tours: [3, 10] },
  { id: 4, name: "フェリーさくら丸", type: "船", contact: "011-666-7777", seats: 200, tours: [4, 15] },
  { id: 5, name: "タクシー東京中央", type: "タクシー", contact: "03-8888-9999", seats: 4, tours: [5, 12] },
];

const LOCAL_KEY = "localTransports";

const TransportList = () => {
  const [localTransports, setLocalTransports] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalTransports(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">交通手段一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規交通手段登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>交通手段名</th>
            <th>種別</th>
            <th>連絡先</th>
            <th>座席数</th>
            <th>関連ツアー</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyTransports.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.type}</td>
              <td>{t.contact}</td>
              <td>{t.seats}</td>
              <td>
                {t.tours.map(tid => {
                  const tour = dummyTours.find(dt => dt.id === tid);
                  return tour ? <span key={tid} className="tag is-info is-light mr-1">{tour.name}</span> : null;
                })}
              </td>
              <td>
                <Link to={`${t.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${t.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${t.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localTransports.map((t) => (
            <tr key={t.id} style={{ background: "#f6fff6" }}>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>{t.type}</td>
              <td>{t.contact}</td>
              <td>{t.seats}</td>
              <td>
                {t.tours && t.tours.map(tid => {
                  const tour = dummyTours.find(dt => dt.id === tid);
                  return tour ? <span key={tid} className="tag is-info is-light mr-1">{tour.name}</span> : null;
                })}
              </td>
              <td>
                <Link to={`${t.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${t.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${t.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Transports = () => {
  return (
    <Routes>
      <Route index element={<TransportList />} />
      <Route path="create" element={<TransportCreate />} />
      <Route path=":id" element={<TransportDetail />} />
      <Route path=":id/edit" element={<TransportEdit />} />
      <Route path=":id/delete" element={<TransportDelete />} />
    </Routes>
  );
};

export default Transports; 