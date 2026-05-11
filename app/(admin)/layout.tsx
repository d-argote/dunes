import type { ReactNode } from "react";
import AdminSidebar from "./_components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-on-background antialiased">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:ml-[240px]">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
