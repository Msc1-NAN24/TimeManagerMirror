import { defineStore } from 'pinia'
import {IUser} from "@/dto/user";
import userService from "@/services/users";
import userRepository from "@/repository/users";

const TOKEN_STORAGE_KEY = "access_token";

export enum IsLogged {
  Logged,
  Loading,
  NotLogged,
}

type AuthStoreType = {
  user?: IUser,
  isLogged: IsLogged,
  accessToken: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: undefined,
    isLogged: IsLogged.Loading,
    accessToken: '',
  }) as AuthStoreType,
  actions: {
    login(accessToken: string, user: IUser) {
      this.user = user;
      this.isLogged = IsLogged.Logged;
      this.accessToken = accessToken;
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken)
    },
    loginFromStorage() {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token != null) {
        this.accessToken = token;
        this.isLogged = IsLogged.Logged;
      }
      userRepository.getMe(token, (user, error) => {
        if (user !== undefined) {
          this.user = user;
        } else if (error) {
          this.isLogged = IsLogged.NotLogged;
        }
      });
    },
    clearAuthStorage() {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    },
    logoutUser() {
      this.user = undefined;
      this.isLogged = IsLogged.NotLogged;
      this.accessToken = '';
    }
  },
});