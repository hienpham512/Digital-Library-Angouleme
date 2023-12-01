import { Book, PDF_content } from "./book";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "other";
  birthday: Date;
  role: Role;
  profession: Profession;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  ratedBooks?: Book["id"][];
  readBoooks?: Book["id"][];
  card?: Book["id"][];
  onGoingBook?: OnGoingBook[];
}

interface OnGoingBook {
  bookId: Book["id"];
  pageOn: PDF_content["page"];
}

type Role = "ADMIN" | "SUPER_ADMIN" | "USER";

type Profession = "STUDENT" | "OTHERS";

export type { User, OnGoingBook, Role, Profession };
