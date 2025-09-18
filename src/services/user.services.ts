import type { LoginResponse } from "../types/types";
import type { Role, Teacher, User, UserCredentials, UserFormData } from "../types/user";
import { dateToString } from "../utils/date";
import { service } from "./config.services";

// Transform functions
function transformResponseToUser(data: User): User {
  return { ...data, dateOfBirth: new Date(data.dateOfBirth) };
}

function transformResponseToTeacher(data: Teacher): Teacher {
  return {
    ...transformResponseToUser(data),
    teacherProfile: {
      description: data.teacherProfile.description,
      previousCourses: data.teacherProfile.previousCourses,
      activeCourses: data.teacherProfile.activeCourses,
    }
    
  };
}

function transformResponseToUsers(data: User[]): User[] {
  return data.map((eachUser) => transformResponseToUser(eachUser));
}

function transformResponseToTeachers(data: Teacher[]): Teacher[] {
  return data.map((eachTeacher) => transformResponseToTeacher(eachTeacher));
}

export function transformUserToForm(user: User): UserFormData {
  return { ...user, dateOfBirth: dateToString(user.dateOfBirth) };
}

function transformUserFormToUser(formData: UserFormData): Partial<User> {
  return { ...formData, dateOfBirth: new Date(formData.dateOfBirth) };
}

// Service functions
export const getAllUsers = async (): Promise<User[]> => {
  const response = await service.get(`/user`);
  return transformResponseToUsers(response.data);
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await service.get(`/user/${userId}`);
  return transformResponseToUser(response.data);
};

export const getAllStudents = async (): Promise<User[]> => {
  const response = await service.get(`/user/students`);
  return transformResponseToUsers(response.data);
};

export const getAllEnrolledStudents = async (): Promise<User[]> => {
  const response = await service.get(`/user/students?enrollment=active`);
  return transformResponseToUsers(response.data);
};

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const response = await service.get(`/user/teachers`);
  return transformResponseToTeachers(response.data);
};

export const updateTeacherDescription = async (userId: string, teacherDescription: Partial<Teacher>): Promise<User> => {
  const response = await service.patch(`/user/teachers/${userId}`, { teacherProfile: { description: teacherDescription } });
  return transformResponseToUser(response.data);
};

export const getPublicInfoFromAllTeachers = async (): Promise<Teacher[]> => {
  const response = await service.get(`/user/teachers/info`);
  return transformResponseToTeachers(response.data);
};

export const getAllStaff = async (): Promise<User[]> => {
  const response = await service.get(`/user/staff`);
  return transformResponseToUsers(response.data);
};

export const getMyProfile = async (): Promise<User> => {
  const response = await service.get(`/user/profile`);
  return transformResponseToUser(response.data);
};

export const editProfile = async (userData: UserFormData): Promise<User> => {
  const response = await service.put(`/user/profile`, transformUserFormToUser(userData));
  return response.data;
};

export const assignRoleToUser = async (userId: string, newRole: Role): Promise<User> => {
  const response = await service.patch(`/user/${userId}/role/${newRole}`);
  return response.data;
};

export const signUpUser = async (userData: UserFormData): Promise<User> => {
  const response = await service.post(`/auth/signup`, transformUserFormToUser(userData));
  return response.data;
};

export const loginUser = async (userData: UserCredentials): Promise<LoginResponse> => {
  const response = await service.post(`/auth/login`, userData);
  return response.data;
};

export const verifyUser = async (): Promise<User> => {
  const response = await service.get(`/auth/verify`);
  return response.data;
};

export const uploadImage = async (uploadData: FormData): Promise<string> => {
  const response = await service.post("/upload", uploadData);
  return response.data.imageUrl;
};
