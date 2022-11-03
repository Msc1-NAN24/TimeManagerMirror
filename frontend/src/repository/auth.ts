import { ICreateUser, IUser } from "@/dto/user";
import {IAuthLogin} from "@/dto/auth";
import Api from "@/utils/Api";

const authRepository = {
  login: (email: string, password: string, callback: (user?: IAuthLogin, error?: string) => void) => {
    Api.post<IAuthLogin>(`/auth/login`, {email, password}).then((response) => {
      callback(response.data);
    }).catch((err) => {
      callback(undefined, "Une erreur est survenue !");
    });
  },
  register: async (createUser: ICreateUser) => {
    try {
      const { data } = await Api.post<IUser>(
        '/auth/register',
        createUser
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default authRepository;
