import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyInvoices } from "./Invoices";
import { useSnackbar } from "../../components/SnackbarContext";

const LOCAL_KEY = "localInvoices";

const InvoiceDelete = () => {
  const { id } = useParams();
  let invoice = dummyInvoices.find((i) => i.id === Number(id));
  let isLocal = false;
  if (!invoice) {
    const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    invoice = local.find((i) => i.id === Number(id));
    if (invoice) isLocal = true;
  }
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  const handleDelete = () => {
    if (isLocal) {
      const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      const filtered = local.filter((i) => i.id !== Number(id));
      localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
      showSnackbar("請求書を削除しました", "is-danger");
    }
    navigate("/invoices");
  };

  if (!invoice) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={() => navigate(-1)}></div>
      <div className="modal-card" style={{ borderRadius: "1.5rem", maxWidth: 420 }}>
        <header className="modal-card-head has-background-danger-light">
          <p className="modal-card-title has-text-danger has-text-weight-bold">
            <span className="icon mr-2"><i className="fas fa-exclamation-triangle"></i></span>
            請求書削除確認
          </p>
          <button className="delete" aria-label="close" onClick={() => navigate(-1)}></button>
        </header>
        <section className="modal-card-body has-text-centered">
          <p className="mb-4">本当に「<strong>{invoice.number}</strong>」を削除しますか？</p>
          {!isLocal && <p className="has-text-grey mb-2">（サンプルデータは削除できません）</p>}
        </section>
        <footer className="modal-card-foot is-justify-content-center">
          <button className="button is-danger is-medium is-rounded mr-3" onClick={handleDelete} disabled={!isLocal}>
            <span className="icon"><i className="fas fa-trash"></i></span>
            <span>削除</span>
          </button>
          <button className="button is-light is-medium is-rounded" onClick={() => navigate(-1)}>
            キャンセル
          </button>
        </footer>
      </div>
    </div>
  );
};

export default InvoiceDelete; 