"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const { authUser, logout } = useAuth();
  return (
    <header className="border-b px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-2">
        <Link href={"/"}>UMS</Link>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"sm"}
                variant={"ghost"}
                className="focus-visible:ring-0"
              >
                <Avatar className="cursor-pointer size-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xl text-white font-bold bg-black dark:bg-white dark:text-black">
                    {authUser?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <h3>{authUser?.username}</h3>
                  <p className="text-muted-foreground">{authUser?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="size-5" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer bg-destructive text-destructive-foreground focus:bg-destructive/90 focus:text-white"
              >
                <LogOut className="size-5" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
