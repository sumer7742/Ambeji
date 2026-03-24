import Cookies from "js-cookie";
export const TOKEN_KEY = "accessToken";
export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};
export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { path: "/" });
};
export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
};
