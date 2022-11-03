enum rank {
  user,
  manager,
  generalManager,
}

export interface IUser {
  id: number;
  email: string;
  rank: rank;
  lastname: string;
  firstname: string;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  rank?: rank;
  lastname?: string;
  firstname?: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}
