import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkUserGeo } from "./geo.api";
import Loading from "./GeoLoading";

export default function GeoRestriction() {
  const [status, setStatus] = useState({
    loading: true,
    allowed: false,
    blocked: false,
    error: false,
    reason: null,
  });

  useEffect(() => {
    let isMounted = true;

    const runGeoCheck = async () => {
      const res = await checkUserGeo();

      console.log("res ", res)

      if (!isMounted) return;

      setStatus({
        loading: false,
        allowed: res.allowed,
        blocked: res.blocked,
        error: res.error,
        reason: res.reason,
      });
    };

    runGeoCheck();

    return () => {
      isMounted = false;
    };
  }, []);

  console.log("status ", status)

  /* -------------------- LOADING -------------------- */
  if (status.loading) {
    return <Loading />;
  }

  /* -------------------- ERROR -------------------- */
  if (status.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] px-4">
        <div className="max-w-xl text-center text-white space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Something went wrong
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            We couldn’t verify your location right now.  
            Please try again in a few moments.
          </p>
        </div>
      </div>
    );
  }

  /* -------------------- GEO BLOCKED -------------------- */
  if (status.blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#0d3768] via-[#124D95] to-[#0d3768] px-4">
        <div className="max-w-xl text-center text-white space-y-4">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Service unavailable in your region
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            TruHealth Insurance services are currently available only
            to users in the United States.
          </p>
        </div>
      </div>
    );
  }

  /* -------------------- ALLOWED -------------------- */
  if (status.allowed) {
    return <Outlet />;
  }

  // fallback (should never hit, but safe)
  return null;
}
