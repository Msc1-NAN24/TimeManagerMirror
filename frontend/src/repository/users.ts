import { IUpdateUser, IUser } from "@/dto/user";
import Api, {authorize} from "@/utils/Api";

const getUserById = async (id: number) => {
  const { data } = await Api.get<IUser>(`/user/${id}`);
  return data;
};

const getMe = (accessToken: string, callback: (user?: IUser, error?: string) => void) => {
  Api.get<IUser>(`/users/me`, authorize(accessToken)).then((response) => {
    callback(response.data)
  }).catch((err) => {
    console.log(err);
    callback(undefined, "Une erreur est survenue lors de la récupération de vos données !");
  });
};

const getAllUsers = async () => {
  const { data } = await Api.get<IUser[]>('/users');
  return data;
};
const updateUser = async (id: number, updateUser: IUpdateUser) => {
  const { data } = await Api.patch<IUser>(
    `/user/${id}`,
    updateUser
  );
  return data;
};
const deleteUser = async (id: number) => {
  const { data } = await Api.delete<IUser>(
    `/user/${id}`
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
