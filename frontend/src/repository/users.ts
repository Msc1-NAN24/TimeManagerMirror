import { IUpdateUser, IUser } from "@/dto/user";
import axios from "axios";
import api, {authorize} from "@/utils/Api";

const getUserById = async (id: number) => {
  const { data } = await axios.get<IUser>(`/api/user/${id}`);
  return data;
};

const getMe = (accessToken: string, callback: (user?: IUser, error?) => void) => {
  axios.get<IUser>(`/api/user/me`, authorize(accessToken)).then((response) => {
    callback(response.data)
  }).catch((err) => {
    console.log(err);
    callback(undefined, "Une erreur est survenue lors de la récupération de vos données !");
  });
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
