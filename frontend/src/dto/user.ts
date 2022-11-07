export interface IUser {
  id: number;
  email: string;
  rank: "employee" | "manager" | "general_manager";
  lastname: string;
  firstname: string;
  insert_at: Date;
  updated_at: Date;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  rank?: "employee" | "manager" | "general_manager";
  lastname?: string;
  firstname?: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}
