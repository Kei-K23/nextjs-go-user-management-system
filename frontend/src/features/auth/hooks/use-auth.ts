import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, getCurrentUser } from "@/lib/api";
import { LoginCredentials, RegisterCredentials } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Cookie from "js-cookie";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: authUser,
    isLoading: isLoadingAuthUser,
    error: getAuthUserError,
  } = useQuery({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      return await login(email, password);
    },
    onSuccess: (data) => {
      Cookie.set("nextjs_go_ums_access_token", data.access_token, {
        expires: 0.5,
      });

      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      toast.success(data.message || "Login successful!");
      router.push("/");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      const errorMessage = error.response?.data?.error || "Login failed!";
      toast.error(errorMessage);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: RegisterCredentials) => {
      return await register(username, email, password);
    },
    onSuccess: (data) => {
      router.push("/login");
      toast.success(data.message);
    },
    onError: () => {
      // TODO handle server response error
      toast.error("Register failed!");
    },
  });

  const logout = () => {
    Cookie.remove("nextjs_go_ums_access_token");
    queryClient.clear();
    router.push("/login");
  };

  return {
    authUser,
    getAuthUserError,
    isLoadingAuthUser,
    login: loginMutation.mutate,
    loginStatus: loginMutation.status,
    register: registerMutation.mutate,
    registerStatus: registerMutation.status,
    logout,
  };
}
