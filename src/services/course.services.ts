import { service } from "./config.services";
import type { Course, CourseFormData } from "../types/types";
import { dateToString } from "../utils/date";

// Transform functions
function transformResponseToCourse(data: Course): Course {
  return { ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) };
}

function transformResponseToCourses(data: Course[]): Course[] {
  return data.map(eachCourse => transformResponseToCourse(eachCourse));
}

export function transformCourseToForm(course: Course): CourseFormData {
  return {...course, startDate: dateToString(course.startDate), endDate: dateToString(course.endDate)}
}

function transformCourseFormToCourse(formData: CourseFormData): Partial<Course> {
  return {...formData, startDate: new Date(formData.startDate), endDate: new Date(formData.endDate) }
}

// Service functions
export const getAllCourses = async (): Promise<Course[]> => {
  const response = await service.get("/course");
  return transformResponseToCourses(response.data);
}

export const getAllActiveCourses = async (): Promise<Course[]> => {
  const response = await service.get("/api/course?status=active");
  return transformResponseToCourses(response.data);
};

export const getPublicInfoFromAllActiveCourses = async (): Promise<Course[]> => {
  const response = await service.get("/course/info");
  return transformResponseToCourses(response.data);
};

export const getPublicInfoFromCourse = async (courseId: string): Promise<Course> => {
  const response = await service.get(`/course/info/${courseId}`);
  return transformResponseToCourse(response.data);
};

export const getCourse = async (courseId: string): Promise<Course> => {
  const response = await service.get(`/course/${courseId}`);
  return transformResponseToCourse(response.data);
};

export const createCourse = async (courseData: CourseFormData): Promise<Course> => {
  const response = await service.post("/course", transformCourseFormToCourse(courseData));
  return response.data;
};

export const editCourse = async (courseId: string, courseData: CourseFormData): Promise<Course> => {
  const response = await service.put(`/course/${courseId}`, transformCourseFormToCourse(courseData));
  return response.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await service.delete(`/course/${courseId}`);  
};
