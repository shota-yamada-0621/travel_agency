import React from "react";

const Snackbar = ({ open, message, type = "is-success", onClose }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", top: 24, left: 0, right: 0, zIndex: 1000, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div
        className={`notification ${type}`}
        style={{ minWidth: 780, maxWidth: 1000, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", pointerEvents: "auto" }}
      >
        <button className="delete" onClick={onClose}></button>
        {message}
      </div>
    </div>
  );
};

export default Snackbar; 