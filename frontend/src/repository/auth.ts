import { ICreateUser, IUser } from "@/dto/user";
import axios from "axios";

const authRepository = {
  login: async (email: string, password: string) => {
    const { data } = await axios.post<{ user: IUser; access_token: string }>(
      `${process.env.URL_API}/auth/login`,
      { email, password }
    );
    return data;
  },
  register: async (createUser: ICreateUser) => {
    const { data } = await axios.post<IUser>(
      `${process.env.URL_API}/auth/register`,
      createUser
    );
    return data;
  },
};

export default authRepository;
