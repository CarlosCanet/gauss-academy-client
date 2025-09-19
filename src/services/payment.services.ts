import type { Payment } from "../types/types";
import { service } from "./config.services";

// Transform functions

// Service functions
export const getPaymentFromEnrollment = async (enrollmentId: string): Promise<Payment> => {
  const response = await service.get(`/payment/enrollment/${enrollmentId}`);
  return response.data;
};

export const getMyPayments = async (): Promise<Payment[]> => {
  const response = await service.get(`/payment/my-payments`);
  return response.data;
};

export const getMyPendingPayments = async (): Promise<Payment[]> => {
  const response = await service.get(`/payment/my-payments?status=incomplete`);
  return response.data;
};

export const createNewPayment = async (enrollmentId: string): Promise<Payment> => {
  const response = await service.post(`/payment/create-payment-intent`, { _id: enrollmentId });
  return response.data;
};

export const updatePayment = async (clientSecret: string, paymentIntentId: string): Promise<Payment> => {
  const response = await service.patch(`/payment/update-payment-intent`, { clientSecret, paymentIntentId });
  return response.data;
};

export const cancelPayment = async (clientSecret: string, paymentIntentId: string): Promise<Payment> => {
  const response = await service.delete(`/payment/cancel-payment-intent`, { data: { clientSecret, paymentIntentId } });
  return response.data;
};
