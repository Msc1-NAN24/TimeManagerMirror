import { IUpdateUser, IUser } from "@/dto/user";
import Api, { authorize } from "@/utils/Api";

const getUserById = async (id: number) => {
  const { data } = await Api.get<IUser>(`/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

const getMe = (
  accessToken: string,
  callback: (user?: IUser, error?: string) => void
) => {
  Api.get<IUser>(`/users/me`, authorize(accessToken))
    .then((response) => {
      callback(response.data);
    })
    .catch((err) => {
      callback(
        undefined,
        "Une erreur est survenue lors de la récupération de vos données !"
      );
    });
};

const deleteUser = async (accessToken: string) => {
  await Api.delete<IUser>(`/users/me`, authorize(accessToken));
};

const deleteUsers = async (accessToken: string, userId: string) => {
  await Api.delete<IUser>(`/users/${userId}`, authorize(accessToken));
};

const deleteUserById = async (id: number) => {
  const { data } = await Api.delete<IUser[]>(`/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

const getAllUsers = async () => {
  const { data } = await Api.get<IUser[]>("/users", {
    headers: {
      Authorization: `${localStorage.getItem("access_token")}`,
    },
  });
  return data;
};

const updateUser = async (id: number, updateUser: IUpdateUser) => {
  const { data } = await Api.put<IUser>(
    `/users/${id}`,
    {
      user: updateUser,
    },
    {
      headers: {
        Authorization: `${localStorage.getItem("access_token")}`,
      },
    }
  );
};

const updateMyUser = async (accessToken: string, updateUser: IUpdateUser) => {
  const { data } = await Api.put<IUser>(
    `/users/me`,
    { user: updateUser },
    authorize(accessToken)
  );
  return data;
};

const resetMyPassword = (
  accessToken: string,
  new_password: string,
  last_password: string
) => {
  return Api.post(
    "/users/reset-password",
    { new_password, last_password },
    authorize(accessToken)
  );
};

const userRepository = {
  getMe,
  getUserById,
  getAllUsers,
  updateMyUser,
  deleteUser,
  resetMyPassword,
  deleteUsers,
  deleteUserById,
};

export default userRepository;
