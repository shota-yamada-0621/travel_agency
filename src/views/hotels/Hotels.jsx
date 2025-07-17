import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import HotelCreate from "./HotelCreate";
import HotelDetail from "./HotelDetail";
import HotelEdit from "./HotelEdit";
import HotelDelete from "./HotelDelete";
import { dummyTours } from "../tours/Tours";

export const dummyHotels = [
  { id: 1, name: "ホテル富士", address: "東京都新宿区1-1-1", rooms: 100, contact: "03-1111-1111", tours: [1, 8] },
  { id: 2, name: "ホテル桜", address: "大阪府大阪市2-2-2", rooms: 80, contact: "06-2222-2222", tours: [2, 11] },
  { id: 3, name: "ホテル松", address: "北海道札幌市3-3-3", rooms: 60, contact: "011-333-3333", tours: [1, 15] },
  { id: 4, name: "ホテル竹", address: "福岡県福岡市4-4-4", rooms: 120, contact: "092-444-4444", tours: [4, 19] },
  { id: 5, name: "ホテル梅", address: "京都府京都市5-5-5", rooms: 50, contact: "075-555-5555", tours: [3, 10] },
];

const LOCAL_KEY = "localHotels";

const HotelList = () => {
  const [localHotels, setLocalHotels] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalHotels(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">ホテル一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規ホテル登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ホテル名</th>
            <th>住所</th>
            <th>部屋数</th>
            <th>連絡先</th>
            <th>関連ツアー</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyHotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
              <td>{hotel.rooms}</td>
              <td>{hotel.contact}</td>
              <td>
                {hotel.tours.map(tid => {
                  const t = dummyTours.find(t => t.id === tid);
                  return t ? <span key={tid} className="tag is-info is-light mr-1">{t.name}</span> : null;
                })}
              </td>
              <td>
                <Link to={`${hotel.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${hotel.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${hotel.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {/* ローカルストレージのホテルデータを下に追加表示 */}
          {localHotels.map((hotel) => (
            <tr key={hotel.id} style={{ background: "#f6fff6" }}>
              <td>{hotel.id}</td>
              <td>{hotel.name}</td>
              <td>{hotel.address}</td>
              <td>{hotel.rooms}</td>
              <td>{hotel.contact}</td>
              <td>
                {hotel.tours && hotel.tours.map(tid => {
                  const t = dummyTours.find(t => t.id === tid);
                  return t ? <span key={tid} className="tag is-info is-light mr-1">{t.name}</span> : null;
                })}
              </td>
              <td>
                <Link to={`${hotel.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${hotel.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${hotel.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Hotels = () => {
  return (
    <Routes>
      <Route index element={<HotelList />} />
      <Route path="create" element={<HotelCreate />} />
      <Route path=":id" element={<HotelDetail />} />
      <Route path=":id/edit" element={<HotelEdit />} />
      <Route path=":id/delete" element={<HotelDelete />} />
    </Routes>
  );
};

export default Hotels; 