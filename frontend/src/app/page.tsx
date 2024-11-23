"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import useProtectRoute from "@/features/auth/hooks/use-protect-route";
import { columns } from "@/features/users/components/user-table/columns";
import { UserDataTable } from "@/features/users/components/user-table/data-table";
import { useUsers } from "@/features/users/hooks/use-user";
import Link from "next/link";

export default function DashboardPage() {
  useProtectRoute();
  const { authUser, logout } = useAuth();
  const { users, isLoadingUsers } = useUsers();

  return (
    <div className="space-y-4">
      <div>
        <h3>{authUser?.username}</h3>
        <h3>{authUser?.email}</h3>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link href="/users/new">
          <Button>Create User</Button>
        </Link>
        <Button onClick={logout}>Logout</Button>
      </div>
      {isLoadingUsers ? (
        <p>loading...</p>
      ) : (
        <UserDataTable data={users || []} columns={columns} />
      )}
    </div>
  );
}
