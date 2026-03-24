// src/constant/UserProvider.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAdminDetails } from "../hooks/useUserDetails";
import apiClient from "./apiclient";
import { setToken, getToken, removeToken } from "../utils/token";
import type { User } from "../common/types/types";
import toast from "react-hot-toast";
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: any) => boolean; 
  logout: () => Promise<void>;
  isLoading: boolean;
  refetch:()=>void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, isLoading,refetch } = useAdminDetails();
  // Restore user on refresh if token + user exist
  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Sync with backend user details (optional)
  useEffect(() => {
    if (!isLoading && data?.success && data?.data) {
      setUser(data.data);
    }
  }, [data, isLoading]);

  /**
   * login accepts flexible shapes:
   * - axios style: { data: { token: "...", ...user } }
   * - api raw : { token: "...", ...user }
   * - wrapper: res.data (passed directly)
   */
  const login = (payload: any): boolean => {
    // normalize: get user object and token regardless of wrapper
    const maybeAxios = payload?.data ?? payload; // if payload has .data (axios), use it
    const token = maybeAxios?.token ?? maybeAxios?.data?.token;
    const userObj: User | undefined =
      maybeAxios?.data ?? maybeAxios;
    if (token) {
      setToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userObj ?? null);
      return true;
    }
    return false;
  };

  const logout = async (): Promise<void> => {
    try {
      // call logout endpoint if required (wrap in try/catch)
      await apiClient.post("/admin-auth/logOut/").catch(() => {});
    } catch {
      // ignore
    } finally {
      removeToken();
      localStorage.removeItem("user");
      delete apiClient.defaults.headers.common["Authorization"];
      setUser(null);
      toast.success("Successfully Log Out")
      // reload or route away - optional
      window.location.href = "/";
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
        refetch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
