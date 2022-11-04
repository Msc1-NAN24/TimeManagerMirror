import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_URL_API}/api`,
});

export const authorize = (accessToken: string): any => {
  return {
    headers: {authorization: accessToken}
  };
}