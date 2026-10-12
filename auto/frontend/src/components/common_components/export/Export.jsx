import { useState } from "react";
import { GenerateExcelLeads } from "./api_call/api.call";
import ExportButton from "./ExportButton";
import ExportError from "./error/ExportErrorDisplay";
import ExportLoader from "./loader/ExportLoader";

export default function GenerateExcelLeadsWrapper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await GenerateExcelLeads();

      // Create downloadable file
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "insurance_leads.xlsx";
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Pass COMPLETE error object
      setError(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "12px",
        // marginBottom: "12px",
        flexWrap: "wrap",
        padding: "8px",
      }}
    >
      <ExportButton onClick={handleExport} loading={loading} />
      <ExportLoader loading={loading} />
      <ExportError error={error} />
    </div>
  );
}
