import { IUpdateUser, IUser } from "@/dto/user";
import axios from "axios";
import Api, { authorize } from "@/utils/Api";

const getUserById = async (id: number) => {
  const { data } = await Api.get<IUser>(`/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

const getMe = (accessToken: string, callback: (user?: IUser, error?: string) => void) => {
  Api.get<IUser>(`/users/me`, authorize(accessToken)).then((response) => {
    callback(response.data)
  }).catch((err) => {
    callback(undefined, "Une erreur est survenue lors de la récupération de vos données !");
  });
};

const deleteUser = (accessToken: string, callback: (error?: string) => void) => {
  axios.delete<IUser>(`/users/`, authorize(accessToken)).then((response) => {
    callback(undefined)
  }).catch((err) => {
    callback("Une erreur est survenue !");
  });
}

const deleteUserById = async (id: number) => {
  const { data } = await Api.delete<IUser[]>(`/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

const getAllUsers = async () => {
  const { data } = await Api.get<IUser[]>('/users', {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data.data;
};

const updateUser = async (id: number, updateUser: IUpdateUser) => {
  const { data } = await Api.put<IUser>(
    `/users/${id}`,
    {
      user: updateUser
    }, {
      headers: {
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    });
  return data;
};

const userRepository = {
  getMe,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteUserById
};

export default userRepository;
