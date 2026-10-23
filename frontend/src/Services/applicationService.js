// Service for handling application-related API calls
import api from "./api";

// Submit a new application to the backend
export const submitApplication = async (applicationFromData) => {
  const response = await api.post("/applications", applicationFromData);
  return response.data;
};
