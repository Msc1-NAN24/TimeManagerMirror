import { IUser } from "./user";

export interface IClock {
    id: number;
    status: boolean;
    time: string;
    user: IUser;
}

export interface ICreateClock {
    time: string;
}