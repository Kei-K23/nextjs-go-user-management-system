import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./use-auth";

export default function useProtectRoute() {
  const { authUser, isLoadingAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingAuthUser && !authUser) {
      router.push("/login");
    }
  }, [authUser, router, isLoadingAuthUser]);
}
