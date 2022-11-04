import {IUser} from "@/dto/user";

export interface ICreateTeam {
  name: string;
}

export interface ITeam {
  owner: IUser;
  members: IUser[];
  name: string;
  created_at: Date;
  updated_at: Date;
}