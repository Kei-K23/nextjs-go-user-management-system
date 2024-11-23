"use client";
import UserCreateForm from "@/features/users/components/user-create-form";
import { useUsers } from "@/features/users/hooks/useUser";

export default function CreateUserPage() {
  const { createUser, createUserStatus } = useUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserCreateForm
        onSubmit={createUser}
        isLoading={createUserStatus === "pending"}
      />
    </div>
  );
}
