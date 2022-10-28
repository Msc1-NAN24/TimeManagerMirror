import { ICreateUser, IUser } from "@/dto/user";
import axios from "axios";

const authRepository = {
  login: async (email: string, password: string) => {
    // const { data } = await axios.post<{ user: IUser; access_token: string }>(
    //   `${import.meta.env.VITE_URL_API}/auth/login`,
    //   { email, password }
    // );
    // return data;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  register: async (createUser: ICreateUser) => {
    // const { data } = await axios.post<IUser>(
    //   `${import.meta.env.VITE_URL_API}/auth/register`,
    //   createUser
    // );
    // return data;
    const response = await fetch(
      `${import.meta.env.VITE_URL_API}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(createUser),
      }
    );
    const data = await response.json();
    return data;
  },
};

export default authRepository;
