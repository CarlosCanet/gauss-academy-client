import type { Course, CourseFormData, Enrollment, EnrollmentFormData } from "../types/types";
import { dateToString } from "./date";

export function transformResponseToCourse(data: Course): Course {
  return { ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) };
}

export function transformCourseToForm(course: Course): CourseFormData {
  return {...course, startDate: dateToString(course.startDate), endDate: dateToString(course.endDate)}
}

export function transformResponseToEnrollment(data: Enrollment): Enrollment {
  return { ...data, endDate: new Date(data.endDate) };
}

export function transformEnrollmentToForm(enrollment: Enrollment): EnrollmentFormData {
  return {...enrollment, endDate: dateToString(enrollment.endDate)}
}

