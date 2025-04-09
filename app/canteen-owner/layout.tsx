import type { ReactNode } from "react"
import SidebarClient from "./sidebar-client"

export default function CanteenOwnerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SidebarClient />
      <div className="flex-1 overflow-auto p-6 md:p-8">{children}</div>
    </div>
  )
}
