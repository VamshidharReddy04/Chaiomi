// Franchise inquiry API service
import api from "./api";

export const submitFranchiseInquiry = async (data) => {
  const response = await api.post("/franchise", data);
  return response.data;
};
