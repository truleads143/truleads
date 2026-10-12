import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const fetchLeads = async () => {
  try {
    const res = await axios.get(`${URL}/api/insurance`, {
      withCredentials: true,
    });

    // backend success check
    if (res.data?.success) {
      return res.data.data; // ✅ leads array
    }

    // backend responded but marked failure
    return Promise.reject(res.data);

  } catch (error) {
    // ❌ return FULL error object (axios error)
    return Promise.reject(error);
  }
};
