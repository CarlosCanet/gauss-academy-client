import type { Course } from "./types";

export type Role = "Student" | "Teacher" | "Staff" | "Admin";
export const ROLE_TYPES: Role[] = ["Student", "Teacher", "Staff", "Admin"];

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
  mobileNumber: string,
  profileImageUrl: string,
  role: Role
}

export type UserFormData = Omit<User, "_id" | "dateOfBirth" | "role"> & { dateOfBirth: string };
export type UserFormErrors = Partial<Record<keyof UserFormData, string>>;

export const initialUser: UserFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
  dni: "",
  mobileNumber: "",
  profileImageUrl: ""
};

export interface Teacher extends User {
  description: string,
  previousCourses: Course[],
  activeCourses: Course[]
}
