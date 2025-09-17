import type { Course } from "./types";

export type Role = "Student" | "Teacher" | "Staff" | "Admin";

export interface UserCredentials {
  email: string,
  password: string
}

export interface User {
  _id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  email: string,
  password: string,
  dni: string,
  mobileNumber: number,
  profileImageUrl: string,
}

export const initialUser: UserFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
  dni: "",
  mobileNumber: 0,
  profileImageUrl: ""
};

export interface Teacher extends User {
  description: string,
  previousCourses: Course[],
  activeCourses: Course[]
}

export type UserFormData = Omit<User, "_id" | "dateOfBirth"> & { dateOfBirth: string };
export type UserFormErrors = Partial<Record<keyof UserFormData, string>>;