import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_URL_API}:${import.meta.env.VITE_PORT_API}/api`,
});

export const authorize = (accessToken: string) => {
  return {
    headers: {authorization: accessToken}
  };
}