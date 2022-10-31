import authRepository from "@/repository/auth";
import { ICreateUser } from "@/dto/user";

const authService = {
  login: async (email: string, password: string) => {
    const { user, access_token } = await authRepository.login(email, password);
    localStorage.setItem("token", access_token);
    return user;
  },
  register: async (user: ICreateUser) => {
    const createdUser = await authRepository.register(user);
    return createdUser;
  },
};

export default authService;
