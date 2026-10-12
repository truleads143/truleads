import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const GenerateExcelLeads = async () => {
  try {
    const response = await axios.get(
      `${URL}/api/export/leads`,
      {
        responseType: "blob",      // IMPORTANT for file download
        withCredentials: true,     // keep auth cookies
      }
    );

    return response;
  } catch (error) {
    // Pass COMPLETE error object (as requested)
    throw error;
  }
};
