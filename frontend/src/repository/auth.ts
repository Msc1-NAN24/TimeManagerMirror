import { ICreateUser, IUser } from "@/dto/user";
import axios from "axios";

const authRepository = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await axios.post<{ user: IUser; access_token: string }>(
        `${import.meta.env.VITE_URL_API}:${
          import.meta.env.VITE_PORT_API
        }/api/auth/login`,
        { email, password }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  register: async (createUser: ICreateUser) => {
    try {
      const { data } = await axios.post<IUser>(
        `${import.meta.env.VITE_URL_API}/auth/register`,
        createUser
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authRepository;
