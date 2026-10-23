// Contact API service
import api from "./api";

export const sendMessage = async (data) => {
  const response = await api.post("/contact", data);
  return response.data;
};
