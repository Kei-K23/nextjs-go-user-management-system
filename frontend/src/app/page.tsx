"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { authUser, isLoadingAuthUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuthUser && !authUser) {
      router.push("/login");
    }
  }, [authUser, router, isLoadingAuthUser]);

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
    </div>
  );
}
