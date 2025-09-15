export type Role = "Student" | "Admin" | "Staff" | "Admin" | null;

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

export interface Teacher extends User {
  previousCourses: Course[],
  activeCourses: Course[]
}

export interface Class {
  course: string | Course,
  teachers: string[] | User[],
  numberOfHours: number,
  date: Date,
  type: "Online - Streaming" | "Online - Video" | "In-Person",
  onlineUrl: string,
  classroomName: string,
}

export interface Course {
  _id: string,
  name: string,
  slug: string,
  status: "Planned" | "Active" | "Finished",
  imageUrl: string,
  degreeNames: string,
  startDate: string,
  endDate: string,
  numberOfHours: string,
  teachers: string[] | User[],
  classes: Class[],
  price: number
}

export interface Enrollment {
  student: string | User,
  course: string | Course,
  endDate: Date,
  discountPercent: number
}