import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, getAllUsers } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "../types";

export function useUsers() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading: isLoadingUsers,
    error: getUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const createMutation = useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await createUser(user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfully created new user");
      router.push("/");
    },
    onError: () => {
      // TODO handle server response error
      toast.error("Failed to create user!");
    },
  });

  return {
    users,
    getUsersError,
    isLoadingUsers,
    createUserStatus: createMutation.status,
    createUser: createMutation.mutate,
  };
}
