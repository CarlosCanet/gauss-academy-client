import type { ContactEmail } from "../types/types";
import { service } from "./config.services";

export const sendEmail = async (emailInfo: ContactEmail): Promise<unknown> => {
  const response = await service.post(`/email`, emailInfo);
  console.log("Email:", response);
  return response.data;
};