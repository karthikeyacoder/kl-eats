"use client"

import dynamic from "next/dynamic"

// Import the component dynamically with SSR disabled
const SettingsContent = dynamic(() => import("@/components/canteen-owner/settings-content"), { ssr: false })

export default function SettingsClient() {
  return <SettingsContent />
}
