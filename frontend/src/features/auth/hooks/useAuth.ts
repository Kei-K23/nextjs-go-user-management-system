import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, getCurrentUser } from "@/lib/api";
import { LoginCredentials, RegisterCredentials } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: isLoadingUser,
    error: getUserError,
  } = useQuery({
    queryKey: ["users", "me"],
    queryFn: getCurrentUser,
  });

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      return await login(email, password);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      // TODO name typescript happy
      toast.error(error.response?.data?.error || "Login failed!");
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
      toast.error("Register failed!");
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    router.push("/login");
  };

  return {
    user,
    getUserError,
    isLoadingUser,
    login: loginMutation.mutate,
    loginStatus: loginMutation.status,
    register: registerMutation.mutate,
    registerStatus: registerMutation.status,
    logout,
  };
}
