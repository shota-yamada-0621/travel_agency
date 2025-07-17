import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import TourCreate from "./TourCreate";
import TourDetail from "./TourDetail";
import TourEdit from "./TourEdit";
import TourDelete from "./TourDelete";

export const dummyTours = [
  { id: 1, name: "北海道満喫ツアー", price: 120000, status: "販売中" },
  { id: 2, name: "沖縄リゾートツアー", price: 98000, status: "販売中" },
  { id: 3, name: "京都歴史探訪", price: 75000, status: "販売中" },
  { id: 4, name: "九州温泉巡り", price: 88000, status: "販売中" },
  { id: 5, name: "東京シティツアー", price: 65000, status: "販売中" },
  { id: 6, name: "四国絶景ドライブ", price: 90000, status: "販売中" },
  { id: 7, name: "信州高原ハイキング", price: 82000, status: "販売中" },
  { id: 8, name: "富士山登山チャレンジ", price: 110000, status: "販売中" },
  { id: 9, name: "広島平和学習ツアー", price: 70000, status: "販売中" },
  { id: 10, name: "金沢美食の旅", price: 95000, status: "販売中" },
  { id: 11, name: "大阪食い倒れツアー", price: 85000, status: "販売中" },
  { id: 12, name: "名古屋ものづくり体験", price: 80000, status: "販売中" },
  { id: 13, name: "仙台牛タン満喫", price: 78000, status: "販売中" },
  { id: 14, name: "長崎異国情緒ツアー", price: 88000, status: "販売中" },
  { id: 15, name: "北海道流氷クルーズ", price: 130000, status: "販売中" },
  { id: 16, name: "屋久島トレッキング", price: 125000, status: "販売中" },
  { id: 17, name: "青森ねぶた祭り体験", price: 99000, status: "販売中" },
  { id: 18, name: "香川うどん巡り", price: 72000, status: "販売中" },
  { id: 19, name: "福岡屋台グルメ", price: 87000, status: "販売中" },
  { id: 20, name: "山梨ワイナリーツアー", price: 105000, status: "販売中" },
];

const LOCAL_KEY = "localTours";

const statusTag = (status) => {
  if (status === "販売中") return <span className="tag is-success-light has-text-success is-medium">{status}</span>;
  if (status === "販売停止") return <span className="tag is-danger-light has-text-danger is-medium">{status}</span>;
  return <span className="tag is-light is-medium">{status}</span>;
};

const TourList = () => {
  const [localTours, setLocalTours] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    setLocalTours(local);
  }, []);

  return (
    <div>
      <h2 className="title is-4">ツアー商品一覧</h2>
      <Link to="create" className="button is-primary mb-4">新規ツアー登録</Link>
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ツアー名</th>
            <th>価格</th>
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dummyTours.map((tour) => (
            <tr key={tour.id}>
              <td>{tour.id}</td>
              <td>{tour.name}</td>
              <td>¥{tour.price.toLocaleString()}</td>
              <td>{statusTag(tour.status)}</td>
              <td>
                <Link to={`${tour.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${tour.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${tour.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
          {localTours.map((tour) => (
            <tr key={tour.id} style={{ background: "#f6fff6" }}>
              <td>{tour.id}</td>
              <td>{tour.name}</td>
              <td>¥{tour.price.toLocaleString()}</td>
              <td>{statusTag(tour.status)}</td>
              <td>
                <Link to={`${tour.id}`} className="button is-small is-info mr-2">詳細</Link>
                <Link to={`${tour.id}/edit`} className="button is-small is-warning mr-2">編集</Link>
                <Link to={`${tour.id}/delete`} className="button is-small is-danger">削除</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tours = () => {
  return (
    <Routes>
      <Route index element={<TourList />} />
      <Route path="create" element={<TourCreate />} />
      <Route path=":id" element={<TourDetail />} />
      <Route path=":id/edit" element={<TourEdit />} />
      <Route path=":id/delete" element={<TourDelete />} />
    </Routes>
  );
};

export default Tours; 