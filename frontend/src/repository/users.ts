import { IUpdateUser, IUser } from "@/dto/user";
import axios from "axios";

const getUserById = async (id: number) => {
  const { data } = await axios.get<IUser>(`/api/user/${id}`);
  return data;
};
const getMe = async () => {
  const { data } = await axios.get<IUser>('/api/user/me');
  return data;
};
const getAllUsers = async () => {
  const { data } = await axios.get<IUser[]>('/api/users');
  return data;
};
const updateUser = async (id: number, updateUser: IUpdateUser) => {
  const { data } = await axios.patch<IUser>(
    `/api/user/${id}`,
    updateUser
  );
  return data;
};
const deleteUser = async (id: number) => {
  const { data } = await axios.delete<IUser>(
    `/api/user/${id}`
  );
  return data;
};

const userRepository = {
  getMe,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default userRepository;
