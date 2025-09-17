import type { Enrollment, EnrollmentFormData } from "../types/types";
import { dateToString } from "../utils/date";
import { service } from "./config.services";

// Transform functions
function transformResponseToEnrollment(data: Enrollment): Enrollment {
  return { ...data, endDate: new Date(data.endDate) };
}

function transformResponseToEnrollments(data: Enrollment[]): Enrollment[] {
  return data.map((eachEnrollment) => transformResponseToEnrollment(eachEnrollment));
}

export function transformEnrollmentToForm(enrollment: Enrollment): EnrollmentFormData {
  return { ...enrollment, endDate: dateToString(enrollment.endDate) };
}

function transformEnrollmentFormToEnrollment(formData: EnrollmentFormData): Partial<Enrollment> {
  return { ...formData, endDate: new Date(formData.endDate) };
}

// Service functions
export const getAllEnrollmentsFromCourse = async (courseId: string): Promise<Enrollment[]> => {
  const response = await service.get(`/enrollment/course/${courseId}`);
  return transformResponseToEnrollments(response.data);
};

export const getEnrollment = async (enrollmentId: string): Promise<Enrollment> => {
  const response = await service.get(`/enrollment/${enrollmentId}`);
  return transformResponseToEnrollment(response.data);
};

export const getMyEnrollments = async (): Promise<Enrollment[]> => {
  const response = await service.get("/enrollment/my-enrollments");
  return transformResponseToEnrollments(response.data);
};

export const createEnrollment = async (courseId: string, enrollmentData: EnrollmentFormData): Promise<Enrollment> => {
  const response = await service.post(`/enrollment/${courseId}`, transformEnrollmentFormToEnrollment(enrollmentData));
  return response.data;
};

export const createEnrollmentToStudent = async (courseId: string, studentId: string, enrollmentData: EnrollmentFormData): Promise<Enrollment> => {
  const response = await service.post(`/enrollment/${courseId}/${studentId}`, transformEnrollmentFormToEnrollment(enrollmentData));
  return response.data;
};

export const editEnrollment = async (courseId: string, studentId: string, enrollmentData: EnrollmentFormData): Promise<Enrollment> => {
  const response = await service.put(`/enrollment/${courseId}/${studentId}`, transformEnrollmentFormToEnrollment(enrollmentData));
  return response.data;
};

export const endEnrollment = async (courseId: string, studentId: string, endDate: string): Promise<Enrollment> => {
  const response = await service.patch(`/enrollment/${courseId}/${studentId}`, { endDate: new Date(endDate) });
  return response.data;
};

export const deleteEnrollment = async (enrollmentId: string): Promise<void> => {
  await service.delete(`/enrollment/${enrollmentId}`);
};
