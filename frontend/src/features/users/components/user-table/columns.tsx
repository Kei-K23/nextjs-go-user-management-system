"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserTableType } from "../../types";

export const columns: ColumnDef<UserTableType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
