import authRepository from "@/repository/auth";
import {ICreateUser} from "@/dto/user";
import {IAuthLogin} from "@/dto/auth";

const authService = {
  login: (email: string, password: string, callback: (auth?: IAuthLogin, error?: string) => void) => {
    authRepository.login(email, password, callback);
  },
  register: async (user: ICreateUser) => await authRepository.register(user),
};

export default authService;
