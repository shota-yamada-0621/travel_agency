import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyInvoices } from "./Invoices";
import { getPartnersData } from "../partners/Partners";

const LOCAL_KEY = "localInvoices";
const DUMMY_INVOICES_KEY = "dummyInvoices";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    // まずlocalStorageからテストデータを確認
    const savedDummyInvoices = JSON.parse(localStorage.getItem(DUMMY_INVOICES_KEY) || "[]");
    let foundInvoice = savedDummyInvoices.find((i) => i.id === Number(id));
    
    if (!foundInvoice) {
      // localStorageデータを確認
      const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      foundInvoice = local.find((i) => i.id === Number(id));
    }
    
    setInvoice(foundInvoice);
  }, [id]);

  if (!invoice) return <div>請求書が見つかりません</div>;

  // ステータス変更処理
  const handleStatusChange = (newStatus) => {
    // テストデータの場合
    const savedDummyInvoices = JSON.parse(localStorage.getItem(DUMMY_INVOICES_KEY) || "[]");
    const isDummyInvoice = savedDummyInvoices.find(i => i.id === Number(id));
    
    if (isDummyInvoice) {
      // テストデータのlocalStorageを更新
      const updatedDummyInvoices = savedDummyInvoices.map(inv => 
        inv.id === Number(id) ? { ...inv, status: newStatus } : inv
      );
      localStorage.setItem(DUMMY_INVOICES_KEY, JSON.stringify(updatedDummyInvoices));
      setInvoice({ ...invoice, status: newStatus });
    } else {
      // localStorageデータの場合
      const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      const updatedLocal = local.map(inv => 
        inv.id === Number(id) ? { ...inv, status: newStatus } : inv
      );
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedLocal));
      setInvoice({ ...invoice, status: newStatus });
    }

    setNotificationMessage(`ステータスを「${newStatus}」に変更しました`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // 取引先情報を取得
  const partner = invoice.partnerId ? getPartnersData().find(p => p.id === invoice.partnerId) : null;

  const statusTag = (status) => {
    if (status === "支払い済") return <span className="tag is-success is-medium">{status}</span>;
    if (status === "未払い") return <span className="tag is-danger is-medium">{status}</span>;
    if (status === "支払い遅延") return <span className="tag is-warning is-medium">{status}</span>;
    return <span className="tag is-light is-medium">{status}</span>;
  };

  return (
    <div className="container mx-auto p-4">
      {/* 通知 */}
      {showNotification && (
        <div className="notification is-success is-light mb-4">
          <button className="delete" onClick={() => setShowNotification(false)}></button>
          {notificationMessage}
        </div>
      )}

      <div className="box" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h1 className="title has-text-white mb-0">
          <span className="icon-text">
            <span className="icon">
              <i className="fas fa-file-invoice"></i>
            </span>
            <span>請求書詳細</span>
          </span>
        </h1>
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
                  <td><strong>請求書番号:</strong></td>
                  <td><span className="tag is-info is-light">{invoice.number}</span></td>
                </tr>
                <tr>
                  <td><strong>請求種別:</strong></td>
                  <td>
                    <div>
                      <strong>{invoice.type || "一般"}</strong>
                      <br />
                      <small className="has-text-grey">{invoice.description || ""}</small>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>金額:</strong></td>
                  <td><span className="has-text-danger is-size-4 has-text-weight-bold">¥{invoice.amount.toLocaleString()}</span></td>
                </tr>
                <tr>
                  <td><strong>発行日:</strong></td>
                  <td>{invoice.issued}</td>
                </tr>
                <tr>
                  <td><strong>支払期限:</strong></td>
                  <td>{invoice.dueDate || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>支払状況:</strong></td>
                  <td>{statusTag(invoice.status)}</td>
                </tr>
              </tbody>
            </table>

            {/* ステータス変更ボタン */}
            <div className="mt-4">
              <h4 className="title is-6">ステータス変更</h4>
              <div className="buttons">
                <button 
                  className={`button is-small ${invoice.status === "未払い" ? "is-danger" : "is-outlined"}`}
                  onClick={() => handleStatusChange("未払い")}
                >
                  未払い
                </button>
                <button 
                  className={`button is-small ${invoice.status === "支払い遅延" ? "is-warning" : "is-outlined"}`}
                  onClick={() => handleStatusChange("支払い遅延")}
                >
                  支払い遅延
                </button>
                <button 
                  className={`button is-small ${invoice.status === "支払い済" ? "is-success" : "is-outlined"}`}
                  onClick={() => handleStatusChange("支払い済")}
                >
                  支払い済
                </button>
              </div>
            </div>
          </div>

          <div className="column is-6">
            <h3 className="title is-5">
              <span className="icon-text">
                <span className="icon">
                  <i className="fas fa-building"></i>
                </span>
                <span>取引先情報</span>
              </span>
            </h3>
            {partner ? (
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <td><strong>取引先番号:</strong></td>
                    <td><span className="tag is-info is-light">{partner.number}</span></td>
                  </tr>
                  <tr>
                    <td><strong>取引先名:</strong></td>
                    <td><strong>{partner.name}</strong></td>
                  </tr>
                  <tr>
                    <td><strong>担当者:</strong></td>
                    <td>{partner.manager}</td>
                  </tr>
                  <tr>
                    <td><strong>電話番号:</strong></td>
                    <td><a href={`tel:${partner.phone}`} className="has-text-link">{partner.phone}</a></td>
                  </tr>
                  <tr>
                    <td><strong>メールアドレス:</strong></td>
                    <td><a href={`mailto:${partner.email}`} className="has-text-link">{partner.email}</a></td>
                  </tr>
                  <tr>
                    <td><strong>住所:</strong></td>
                    <td>{partner.address}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <div className="notification is-warning is-light">
                <p>取引先情報が見つかりません</p>
              </div>
            )}
          </div>
        </div>

        <div className="columns is-centered mt-4">
          <div className="column is-narrow">
            <Link to="../" className="button is-primary">
              <span className="icon">
                <i className="fas fa-arrow-left"></i>
              </span>
              <span>一覧に戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail; 