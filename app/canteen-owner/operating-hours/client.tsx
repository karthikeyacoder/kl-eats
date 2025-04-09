"use client"

import dynamic from "next/dynamic"

// Import the component dynamically with SSR disabled
const OperatingHoursContent = dynamic(() => import("@/components/canteen-owner/operating-hours-content"), {
  ssr: false,
})

export default function OperatingHoursClient() {
  return <OperatingHoursContent />
}
