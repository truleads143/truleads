import React from "react";

export default function ExportLoader({ loading }) {
  if (!loading) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.85rem",
        color: "#374151",
      }}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          border: "2px solid #d1d5db",
          borderTop: "2px solid #374151",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>Preparing Excel…</span>

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
