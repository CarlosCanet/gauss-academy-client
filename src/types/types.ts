import { dateToString } from "../utils/date";
import type { User } from "./user"

export interface LoginResponse {
  authToken: string
}

export type CourseStatus = "Planned" | "Active" | "Finished";
export const COURSE_STATUS: CourseStatus[] = ["Planned", "Active", "Finished"];

export interface Course {
  _id: string,
  name: string,
  slug: string,
  status: CourseStatus,
  imageUrl: string,
  degreeNames: string,
  startDate: Date,
  endDate: Date,
  numberOfHours: string,
  teachers: string[] | User[],
  classes: CourseClass[],
  price: number
}


export type CourseFormData = Omit<Course, "_id" | "startDate" | "endDate"> & { startDate: string, endDate: string };
export type CourseFormErrors = Partial<Record<keyof CourseFormData, string>>;

export const initialCourseForm: CourseFormData = {
  name: "",
  slug: "",
  status: "Planned",
  imageUrl: "",
  degreeNames: "",
  startDate: dateToString(new Date()),
  endDate: "",
  numberOfHours: "",
  teachers: [],
  classes: [],
  price: 0
};

export interface Enrollment {
  _id: string,
  student: string | User,
  course: string | Course,
  endDate: Date,
  discountPercent: number,
  createdAt?: number,
  updatedAt?: number
}
export type EnrollmentFormData = Omit<Enrollment, "_id" | "endDate"> & { endDate: string };
export type EnrollmentFormErrors = Partial<Record<keyof EnrollmentFormData, string>>;
export const initialEnrollmentForm: EnrollmentFormData = {
  student: "", 
  course: "", 
  endDate: "", 
  discountPercent: 0
}

export type ClassType = "Online - Streaming" | "Online - Video" | "In-Person";
export const CLASS_TYPES: ClassType[] = ["Online - Streaming", "Online - Video", "In-Person"];

export interface CourseClass {
  _id: string,
  course: string | Course,
  teachers?: string[] | User[],
  numberOfHours: number,
  date: Date,
  classType: ClassType,
  onlineUrl?: string,
  classroomName?: string,
}
export type ClassFormData = Omit<CourseClass, "_id" | "date"> & { date: string };
export type ClassFormErrors = Partial<Record<keyof ClassFormData, string>>;
export const initialClassForm: ClassFormData = {
  course: "",
  teachers: [],
  numberOfHours: 0,
  date: "",
  classType: "Online - Streaming",
  onlineUrl: "",
}