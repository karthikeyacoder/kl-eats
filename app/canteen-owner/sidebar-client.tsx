"use client"

import dynamic from "next/dynamic"

const CanteenOwnerSidebar = dynamic(() => import("@/components/canteen-owner/canteen-owner-sidebar"), { ssr: false })

export default function SidebarClient() {
  return <CanteenOwnerSidebar />
}
