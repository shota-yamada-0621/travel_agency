import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localReservations";

// ツアーデータを取得する関数
const getToursData = () => {
  const localTours = JSON.parse(localStorage.getItem("localTours") || "[]");
  const dummyTours = [
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
    { id: 20, name: "山梨ワイナリーツアー", price: 105000, status: "販売中" }
  ];
  return [...dummyTours, ...localTours];
};

const ReservationCreate = () => {
  const [name, setName] = useState("");
  const [tourId, setTourId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("確定");
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setTours(getToursData());
  }, []);

  const handleTourChange = (e) => {
    const tourId = e.target.value;
    setTourId(tourId);
    
    if (tourId) {
      const tour = tours.find(t => t.id === Number(tourId));
      setSelectedTour(tour);
    } else {
      setSelectedTour(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const newId = local.length > 0 ? Math.max(...local.map(r => r.id)) + 1 : 1001;
    
    const newReservation = { 
      id: newId, 
      name, 
      tourId: Number(tourId),
      tourName: selectedTour?.name || "",
      tourPrice: selectedTour?.price || 0,
      date, 
      status 
    };
    
    localStorage.setItem(LOCAL_KEY, JSON.stringify([...local, newReservation]));
    showSnackbar("予約を登録しました", "is-success");
    navigate("../");
  };

  return (
    <div className="columns is-centered" style={{ minHeight: "80vh", alignItems: "center" }}>
      <div className="column is-8-tablet is-7-desktop is-6-widescreen">
        <div className="box" style={{ borderRadius: "1.5rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}>
          <h2 className="title is-3 has-text-primary has-text-centered mb-5">新規予約登録</h2>
          <form onSubmit={handleSubmit}>
            <div className="field mb-5">
              <label className="label is-large">顧客名</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" value={name} onChange={e => setName(e.target.value)} required placeholder="顧客名を入力" />
                <span className="icon is-left"><i className="fas fa-user"></i></span>
              </div>
            </div>
            
            <div className="field mb-5">
              <label className="label is-large">ツアー選択</label>
              <div className="control has-icons-left">
                <div className="select is-large is-rounded" style={{ width: "100%" }}>
                  <select value={tourId} onChange={handleTourChange} required style={{ width: "100%" }}>
                    <option value="">ツアーを選択してください</option>
                    {tours.map(tour => (
                      <option key={tour.id} value={tour.id}>
                        {tour.name} - ¥{tour.price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="icon is-left"><i className="fas fa-plane"></i></span>
              </div>
            </div>

            {selectedTour && (
              <div className="field mb-5">
                <div className="box has-background-info-light">
                  <div className="columns is-mobile is-vcentered">
                    <div className="column">
                      <p className="title is-5 mb-1">{selectedTour.name}</p>
                      <p className="subtitle is-6">選択されたツアー</p>
                    </div>
                    <div className="column is-narrow">
                      <span className="tag is-info is-large">
                        ¥{selectedTour.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="field mb-5">
              <label className="label is-large">予約日</label>
              <div className="control has-icons-left">
                <input className="input is-large is-rounded" type="date" value={date} onChange={e => setDate(e.target.value)} required />
                <span className="icon is-left"><i className="fas fa-calendar"></i></span>
              </div>
            </div>
            
            <div className="field mb-6">
              <label className="label is-large">ステータス</label>
              <div className="control">
                <div className="select is-large is-rounded">
                  <select value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="確定">確定</option>
                    <option value="仮予約">仮予約</option>
                    <option value="キャンセル">キャンセル</option>
                  </select>
                </div>
              </div>
            </div>

            {selectedTour && (
              <div className="field mb-6">
                <div className="box has-background-success-light">
                  <div className="columns is-mobile is-vcentered">
                    <div className="column">
                      <p className="title is-4 has-text-success mb-1">
                        予約料金: ¥{selectedTour.price.toLocaleString()}
                      </p>
                      <p className="subtitle is-6 has-text-success">
                        選択されたツアーの料金が自動反映されます
                      </p>
                    </div>
                    <div className="column is-narrow">
                      <span className="icon is-large has-text-success">
                        <i className="fas fa-check-circle"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="has-text-centered">
              <button className="button is-primary is-large is-rounded has-text-weight-bold px-6" type="submit">
                <span className="icon"><i className="fas fa-calendar-plus"></i></span>
                <span>登録</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationCreate; 