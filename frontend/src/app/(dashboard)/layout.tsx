import Header from "@/components/header";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto my-10">{children}</div>
    </div>
  );
}
