import { service } from "./config.services";
import type { CourseClass } from "../types/types";

// Class Functions
function transformResponseToClass(data: CourseClass): CourseClass {
  return { ...data, date: new Date(data.date), course: typeof data.course === "object" && data.course ? data.course.name : data.course };
}

function transformResponseToClasses(data: CourseClass[]): CourseClass[] {
  return data.map(eachClass => transformResponseToClass(eachClass));
}

// function transformClassToForm(oneClass: CourseClass): ClassFormData {
//   return {...oneClass, date: dateToString(oneClass.date)}
// }

// Service functions
export const getClassesFromCourse = async (courseId: string): Promise<CourseClass[]> => {
  const response = await service.get(`/class/course/${courseId}`);
  return transformResponseToClasses(response.data);
};

export const getClass = async (classId: string): Promise<CourseClass> => {
  const response = await service.get(`/class/${classId}`);
  return transformResponseToClass(response.data);
};

export const createClass = async (courseId: string, classData: Partial<CourseClass>): Promise<CourseClass> => {
  const response = await service.post(`/class/${courseId}`, classData);
  return response.data;
};

export const editClass = async (classId: string, classData: Partial<CourseClass>): Promise<CourseClass> => {
  const response = await service.put(`/class/${classId}`, classData);
  return response.data;
};

export const deleteClass = async (classId: string): Promise<void> => {
  await service.delete(`/class/${classId}`);
};
