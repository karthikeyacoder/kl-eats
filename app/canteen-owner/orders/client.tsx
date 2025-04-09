"use client"

import dynamic from "next/dynamic"

// Import the component dynamically with SSR disabled
const OrdersContent = dynamic(() => import("@/components/canteen-owner/orders-content"), { ssr: false })

export default function OrdersClient() {
  return <OrdersContent />
}
