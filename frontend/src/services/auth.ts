import authRepository from "@/repository/auth";
import { ICreateUser } from "@/dto/user";
import { IAuthLogin } from "@/dto/auth";

const authService = {
  login: async (
    email: string,
    password: string,
    callback: (auth?: IAuthLogin, error?: string) => void
  ) => {
    await authRepository.login(email, password);
  },
  register: async (user: ICreateUser) => await authRepository.register(user),
};

export default authService;
