import { IUser, IUpdateUser } from "@/dto/user";
import userRepository from "@/repository/users";

const getUserById = async (id: number): Promise<IUser> => {
  const user = await userRepository.getUserById(id);
  return user;
};
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await userRepository.getAllUsers();
  return users;
};
// const createUser = async (user: ICreateUser): Promise<IUser> => {
//   const created_user = await userRepository.CreateUser(user);
//   return created_user;
// };
const updateUser = async (id: number, user: IUpdateUser): Promise<IUser> => {
  const updated_user = await userRepository.updateUser(id, user);
  return updated_user;
};
const deleteUser = async (id: number): Promise<IUser> => {
  const user = await userRepository.deleteUser(id);
  return user;
};

const userService = {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default userService;
