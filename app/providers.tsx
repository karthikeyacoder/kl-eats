"use client"

import type { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { UserProvider } from "@/lib/user-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  )
}
