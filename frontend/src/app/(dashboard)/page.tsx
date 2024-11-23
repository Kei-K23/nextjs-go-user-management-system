"use client";
import { Button } from "@/components/ui/button";
import useProtectRoute from "@/features/auth/hooks/use-protect-route";
import { columns } from "@/features/users/components/user-table/columns";
import { UserDataTable } from "@/features/users/components/user-table/data-table";
import { useUsers } from "@/features/users/hooks/use-user";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  useProtectRoute();
  const { users, isLoadingUsers } = useUsers();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link href="/users/new">
          <Button>
            <UserPlus /> Create User
          </Button>
        </Link>
      </div>
      {isLoadingUsers ? (
        <p>loading...</p>
      ) : (
        <UserDataTable data={users || []} columns={columns} />
      )}
    </div>
  );
}
