"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { usePathname } from "next/navigation"

export default function FloatingCartButton() {
  const { cart } = useCart()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Don't show on cart page or admin/canteen owner pages
  const shouldShow =
    cart.length > 0 && pathname !== "/cart" && !pathname.includes("/admin") && !pathname.includes("/canteen-owner")

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener
      window.addEventListener("resize", checkIfMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  if (!shouldShow || !isMobile) {
    return null
  }

  return (
    <Link href="/cart">
      <div className="fixed bottom-20 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg md:hidden">
        <ShoppingCart className="h-6 w-6 text-white" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </div>
    </Link>
  )
}
