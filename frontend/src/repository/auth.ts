import { ICreateUser, IUser } from "@/dto/user";
import axios from "axios";
import {IAuthLogin} from "@/dto/auth";

const authRepository = {
  login: (email: string, password: string, callback: (user?: IAuthLogin, error?) => void) => {
    axios.post<IAuthLogin>(`/api/auth/login`, {email, password}).then((response) => {
      callback(response.data);
    }).catch((err) => {
      callback(undefined, "Une erreur est survenue !");
    });
  },
  register: async (createUser: ICreateUser) => {
    try {
      const { data } = await axios.post<IUser>(
        '/api/auth/register',
        createUser
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authRepository;
