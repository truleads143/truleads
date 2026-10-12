import { useEffect, useState } from "react";
import { fetchLeads } from "./api_calls/Home.api";

import HomeError from "./error/DisplayError";
import EmptyLeads from "./error/EmptyLeads";
import LeadsView from "./components/LeadsView";
import LoadingOverlay from "../../../common_components/Employee_verification_loading";

import GenerateExcelLeadsWrapper from "../../../common_components/export/Export";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchLeads();
        setLeads(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  // 1️⃣ Loading state
  if (loading) {
    return (<LoadingOverlay />
    );
  }

  // 2️⃣ Error state
  if (error) {
    return <HomeError error={error} />;
  }

  // 3️⃣ Empty state
  if (!leads || leads.length === 0) {
    return <EmptyLeads />;
  }

  // 4️⃣ Success state
 return (
  <>
    <GenerateExcelLeadsWrapper />
    <LeadsView leads={leads} />
  </>
);

}
