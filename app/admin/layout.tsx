import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
    </div>
  )
}
