import type { User } from "./user"

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