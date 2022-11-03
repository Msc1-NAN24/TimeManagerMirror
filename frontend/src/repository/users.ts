import { IUpdateUser, IUser } from "@/dto/user";
import axios from "axios";
import {authorize} from "@/utils/Api";

const getUserById = async (id: number) => {
  const { data } = await axios.get<IUser>(`/api/user/${id}`);
  return data;
};

const getMe = (accessToken: string, callback: (user?: IUser, error?: string) => void) => {
  axios.get<IUser>(`/api/users/me`, authorize(accessToken)).then((response) => {
    callback(response.data)
  }).catch((err) => {
    callback(undefined, "Une erreur est survenue lors de la récupération de vos données !");
  });
};

const deleteUser = (accessToken: string, callback: (error?: string) => void) => {
  axios.delete<IUser>(`/api/users/`, authorize(accessToken)).then((response) => {
    callback(undefined)
  }).catch((err) => {
    callback("Une erreur est survenue !");
  });
}

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

const userRepository = {
  getMe,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default userRepository;
