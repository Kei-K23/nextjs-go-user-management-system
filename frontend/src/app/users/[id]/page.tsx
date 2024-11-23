"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, updateUser, deleteUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/features/users/types";
import { toast } from "sonner";
import UserForm from "@/features/users/components/user-form";

export default function EditUser() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
  });

  const updateMutation = useMutation({
    mutationFn: async (user: Partial<User>) => {
      return await updateUser(id, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", id] });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit User</h1>
        <UserForm
          initialData={user}
          onSubmit={updateMutation.mutate}
          isLoading={updateMutation.isPending}
        />
        <Button
          variant="destructive"
          onClick={() => deleteMutation.mutate(id)}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete User"}
        </Button>
      </div>
    </div>
  );
}
