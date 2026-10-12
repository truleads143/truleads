import React from "react";

export default function ExportButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        backgroundColor: loading ? "#e5e7eb" : "#111827",
        color: loading ? "#6b7280" : "#ffffff",
        fontSize: "0.9rem",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "all 0.2s ease",
      }}
    >
      {loading ? "Exporting…" : "Export to Excel"}
    </button>
  );
}
