import React from "react";
import { useParams, Link } from "react-router-dom";
import { dummyReservations } from "./Reservations";

const LOCAL_KEY = "localReservations";

const ReservationDetail = () => {
  const { id } = useParams();
  let reservation = dummyReservations.find((r) => r.id === Number(id));
  if (!reservation) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    reservation = local.find((r) => r.id === Number(id));
  }

  if (!reservation) return <div>予約が見つかりません</div>;

  const statusTag = (status) => {
    if (status === "確定") return <span className="tag is-success is-medium">{status}</span>;
    if (status === "仮予約") return <span className="tag is-warning is-medium">{status}</span>;
    if (status === "キャンセル") return <span className="tag is-danger is-medium">{status}</span>;
    return <span className="tag is-light is-medium">{status}</span>;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div className="columns is-vcentered">
          <div className="column">
            <h1 className="title has-text-white mb-0">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-calendar-check"></i>
                </span>
                <span>予約詳細</span>
              </span>
            </h1>
          </div>
          <div className="column is-narrow">
            <Link to="../" className="button is-white is-outlined">
              <span className="icon">
                <i className="fas fa-arrow-left"></i>
              </span>
              <span>一覧に戻る</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="box mt-4">
        <div className="columns is-multiline">
          <div className="column is-6">
            <h3 className="title is-5">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-info-circle"></i>
                </span>
                <span>基本情報</span>
              </span>
            </h3>
            <table className="table is-fullwidth">
              <tbody>
                <tr>
                  <td><strong>予約ID:</strong></td>
                  <td><span className="tag is-info is-light">{reservation.id}</span></td>
                </tr>
                <tr>
                  <td><strong>顧客名:</strong></td>
                  <td><strong>{reservation.name}</strong></td>
                </tr>
                <tr>
                  <td><strong>予約日:</strong></td>
                  <td>{reservation.date}</td>
                </tr>
                <tr>
                  <td><strong>ステータス:</strong></td>
                  <td>{statusTag(reservation.status)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="column is-6">
            <h3 className="title is-5">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-plane"></i>
                </span>
                <span>ツアー情報</span>
              </span>
            </h3>
            {reservation.tourName ? (
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <td><strong>ツアー名:</strong></td>
                    <td><strong>{reservation.tourName}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>料金:</strong></td>
                    <td>
                      <span className="has-text-danger is-size-4 has-text-weight-bold">
                        ¥{reservation.tourPrice?.toLocaleString() || "未設定"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>ツアーID:</strong></td>
                    <td><span className="tag is-info is-light">{reservation.tourId || "未選択"}</span></td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="notification is-warning is-light">
                <p>ツアーが選択されていません</p>
              </div>
            )}
          </div>
        </div>

        <div className="columns is-centered mt-4">
          <div className="column is-narrow">
            <div className="buttons">
              <Link to={`${reservation.id}/edit`} className="button is-warning">
                <span className="icon">
                  <i className="fas fa-edit"></i>
                </span>
                <span>編集</span>
              </Link>
              <Link to={`${reservation.id}/delete`} className="button is-danger">
                <span className="icon">
                  <i className="fas fa-trash"></i>
                </span>
                <span>削除</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail; 