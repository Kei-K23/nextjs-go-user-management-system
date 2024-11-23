import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, getCurrentUser } from "@/lib/api";
import { LoginCredentials, RegisterCredentials } from "../types";
import { useRouter } from "next/navigation";

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
  });

  const registerMutation = useMutation({
    mutationFn: async ({ username, email, password }: RegisterCredentials) => {
      return await register(username, email, password);
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
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  };
}
