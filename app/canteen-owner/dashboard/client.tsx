"use client"

import dynamic from "next/dynamic"

// Import the component dynamically with SSR disabled
const CanteenOwnerDashboardContent = dynamic(
  () => import("@/components/canteen-owner/dashboard-content"),
  { ssr: false }, // This ensures the component only renders on the client side
)

export default function DashboardClient() {
  return <CanteenOwnerDashboardContent />
}
