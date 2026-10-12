const URL = import.meta.env.VITE_API_URL;

let cachedResponse = null;

export const checkUserGeo = async () => {
  // simple in-memory cache to avoid repeated calls
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const res = await fetch(`${URL}/api/user/geo-check`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await res.json();

    // normalize backend response
    const normalized = {
      allowed: Boolean(data.allowed),
      country: data.country || null,
      blocked: data.reason === "geo_blocked",
      error: Boolean(data.error),
      reason: data.reason || null,
      method: data.method || "unknown",
    };

    // console.log("normalised ", normalized)

    cachedResponse = normalized;
    return normalized;
  } catch (err) {
    // network / fetch failure
    return {
      allowed: false,
      blocked: false,
      error: true,
      reason: "network_error",
      country: null,
      method: "unknown",
    };
  }
};
