import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyHotels } from "./Hotels";
import { dummyTours } from "../tours/Tours";

const LOCAL_KEY = "localHotels";

const HotelEdit = () => {
  const { id } = useParams();
  let hotel = dummyHotels.find((h) => h.id === Number(id));
  if (!hotel) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    hotel = local.find((h) => h.id === Number(id));
  }
  const [name, setName] = useState(hotel?.name || "");
  const [address, setAddress] = useState(hotel?.address || "");
  const [rooms, setRooms] = useState(hotel?.rooms || "");
  const [contact, setContact] = useState(hotel?.contact || "");
  const [tours, setTours] = useState(hotel?.tours || []);
  const navigate = useNavigate();

  const handleTourChange = (e) => {
    const options = Array.from(e.target.options);
    setTours(options.filter(o => o.selected).map(o => Number(o.value)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ローカルストレージのデータを更新
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const idx = local.findIndex((h) => h.id === Number(id));
    if (idx !== -1) {
      local[idx] = { ...local[idx], name, address, rooms: Number(rooms), contact, tours };
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    }
    // dummyHotelsは編集しない
    navigate("../");
  };

  if (!hotel) return <div>ホテルが見つかりません</div>;

  // サンプル＋ローカルストレージのツアーを統合
  const localTours = JSON.parse(localStorage.getItem("localTours") || "[]");
  const allTours = [...dummyTours, ...localTours.filter(lt => !dummyTours.some(dt => dt.id === lt.id))];

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">ホテル編集</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">ホテル名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="ホテル名を入力" />
                <span className="icon is-left"><i className="fas fa-hotel"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">住所</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={address} onChange={e => setAddress(e.target.value)} required placeholder="住所を入力" />
                <span className="icon is-left"><i className="fas fa-map-marker-alt"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">部屋数</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="number" min="1" value={rooms} onChange={e => setRooms(e.target.value)} required placeholder="部屋数を入力" />
                <span className="icon is-left"><i className="fas fa-door-open"></i></span>
              </div>
            </div>
            <div className="field mb-5">
              <label className="label is-large">連絡先</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={contact} onChange={e => setContact(e.target.value)} required placeholder="連絡先を入力" />
                <span className="icon is-left"><i className="fas fa-phone"></i></span>
              </div>
            </div>
            <div className="field mb-6">
              <label className="label is-large">関連ツアー</label>
              <div className="control">
                <select multiple value={tours.map(String)} onChange={handleTourChange} style={{ width: "100%", minHeight: 220, fontSize: "1.2rem" }}>
                  {allTours.map(tour => (
                    <option key={tour.id} value={tour.id}>{tour.name}</option>
                  ))}
                </select>
                <p className="help">CtrlまたはCmdキーで複数選択</p>
              </div>
            </div>
            <div className="has-text-centered">
              <button className="button is-primary is-large is-rounded has-text-weight-bold px-6" type="submit">
                <span className="icon"><i className="fas fa-save"></i></span>
                <span>保存</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelEdit; 