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

export const initialUser: User = {
  _id: "",
  firstName: "",
  lastName: "",
  dateOfBirth: new Date(),
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

export type UserInfoFormData = Omit<User, "_id">;
export type UserInfoFormErrors = Partial<Record<keyof UserInfoFormData, string>>;