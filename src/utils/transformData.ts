import type { CourseClass, ClassFormData, Course, CourseFormData, Enrollment, EnrollmentFormData } from "../types/types";
import { dateToString } from "./date";

// Course Functions
export function transformResponseToCourse(data: Course): Course {
  return { ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) };
}

export function transformCourseToForm(course: Course): CourseFormData {
  return {...course, startDate: dateToString(course.startDate), endDate: dateToString(course.endDate)}
}

// Class Functions
export function transformResponseToClass(data: CourseClass): CourseClass {
  return { ...data, date: new Date(data.date) };
}

export function transformResponseToClasses(data: CourseClass[]): CourseClass[] {
  return data.map(eachClass => transformResponseToClass(eachClass));
}

export function transformClassToForm(oneClass: CourseClass): ClassFormData {
  return {...oneClass, date: dateToString(oneClass.date)}
}

// Enrollment Functions
export function transformResponseToEnrollment(data: Enrollment): Enrollment {
  return { ...data, endDate: new Date(data.endDate) };
}

export function transformEnrollmentToForm(enrollment: Enrollment): EnrollmentFormData {
  return {...enrollment, endDate: dateToString(enrollment.endDate)}
}

