"use client"

import dynamic from "next/dynamic"

// Import the component dynamically with SSR disabled
const FoodItemsContent = dynamic(() => import("@/components/canteen-owner/food-items-content"), { ssr: false })

export default function FoodItemsClient() {
  return <FoodItemsContent />
}
