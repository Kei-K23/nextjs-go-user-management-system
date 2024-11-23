"use client";
import UserForm from "@/features/users/components/user-form";
import { useUsers } from "@/features/users/hooks/use-user";

export default function CreateUserPage() {
  const { createUser, createUserStatus } = useUsers();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm
        onSubmit={createUser}
        isLoading={createUserStatus === "pending"}
      />
    </div>
  );
}
