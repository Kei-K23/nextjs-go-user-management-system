import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, getAllUsers, updateUser } from "@/lib/api";
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

  const updateMutation = useMutation({
    mutationFn: async ({ id, user }: { id: string; user: Partial<User> }) => {
      return await updateUser(id, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfully updated the user");
      router.push("/");
    },
    onError: () => {
      // TODO handle server response error
      toast.error("Failed to update user!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteUser(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Successfully deleted the user");
      router.push("/");
    },
    onError: () => {
      // TODO handle server response error
      toast.error("Failed to delete user!");
    },
  });

  return {
    users,
    getUsersError,
    isLoadingUsers,
    createUserStatus: createMutation.status,
    updateUserStatus: updateMutation.status,
    deleteUserStatus: deleteMutation.status,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
}
