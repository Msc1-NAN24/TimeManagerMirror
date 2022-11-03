import authRepository from "@/repository/auth";
import {ICreateUser, IUser} from "@/dto/user";
import {useAuth} from "@/hook/useAuth";
import {IAuthLogin} from "@/dto/auth";

const authService = {
  login: (email: string, password: string, callback: (auth?: IAuthLogin, error?) => void) => {
    authRepository.login(email, password, callback);
  },
  register: async (user: ICreateUser) => await authRepository.register(user),
};

export default authService;
