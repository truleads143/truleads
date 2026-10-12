import React from "react";

export default function ExportError({ error }) {
  if (!error) return null;

  // Try to extract a meaningful message safely
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong while exporting leads.";

  const statusCode = error?.response?.status;

  return (
    <div
      style={{
        marginTop: "8px",
        padding: "10px 14px",
        borderRadius: "8px",
        backgroundColor: "#fee2e2", // light red
        color: "#991b1b", // dark red
        fontSize: "0.9rem",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      <strong>Export Failed</strong>

      <span>{message}</span>

      {statusCode && (
        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>
          Error Code: {statusCode}
        </span>
      )}
    </div>
  );
}
