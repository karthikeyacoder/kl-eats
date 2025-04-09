"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Download, Printer, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Confetti from "@/components/confetti"
import CelebrationEffects from "@/components/celebration-effects"
import { useCart } from "@/lib/cart-context"
import { playSound } from "@/lib/sound-utils"

// Dynamically import the PDF generator with SSR disabled
const PDFGenerator = dynamic(() => import("@/components/pdf-generator"), {
  ssr: false,
  loading: () => (
    <Button variant="outline" className="flex-1" disabled>
      <Download className="mr-2 h-4 w-4" />
      Preparing Receipt...
    </Button>
  ),
})

export default function OrderSuccessPage() {
  const router = useRouter()
  const { clearCart } = useCart()
  const [orderNumber, setOrderNumber] = useState("")
  const [orderToken, setOrderToken] = useState("")
  const [showConfetti, setShowConfetti] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isPdfReady, setIsPdfReady] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Mock order data for PDF
  const [mockOrder, setMockOrder] = useState({
    id: "",
    date: new Date().toISOString(),
    status: "completed",
    total: 0,
    items: [],
    canteen: "KL Adda",
    deliveryAddress: "Room 203, Boys Hostel, KL University Campus",
    deliveryFee: 40,
  })

  // Load data from sessionStorage only once
  useEffect(() => {
    if (dataLoaded) return

    try {
      // Check if we have order data in sessionStorage
      const cartData = sessionStorage.getItem("orderCart")
      const totalPrice = sessionStorage.getItem("orderTotal")
      const paymentMethod = sessionStorage.getItem("paymentMethod")
      const storedOrderId = sessionStorage.getItem("orderId")
      const storedToken = sessionStorage.getItem("orderToken")
      const orderDate = sessionStorage.getItem("orderDate")

      if (!cartData || !totalPrice) {
        // No order data, redirect to cart
        router.push("/cart")
        return
      }

      // Parse the cart data
      const cart = JSON.parse(cartData)
      const total = Number.parseFloat(totalPrice) + 40 // Add delivery fee

      setOrderDetails({
        cart,
        total,
        paymentMethod,
      })

      // Set order number and token from storage or generate new ones
      const number = storedOrderId
        ? storedOrderId.replace("ORD", "")
        : Math.floor(Math.random() * 1000000)
            .toString()
            .padStart(6, "0")
      const token =
        storedToken ||
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
          Math.floor(Math.random() * 100)
            .toString()
            .padStart(2, "0")

      setOrderNumber(number)
      setOrderToken(token)

      // Update mock order for PDF
      const updatedOrder = {
        id: `ORD${number}`,
        date: orderDate || new Date().toISOString(),
        status: "completed",
        total: total,
        items: cart,
        canteen: cart.length > 0 ? cart[0].canteenName : "KL Adda",
        deliveryAddress: "Room 203, Boys Hostel, KL University Campus",
        deliveryFee: 40,
      }

      setMockOrder(updatedOrder)

      // Mark data as loaded to prevent repeated loading
      setDataLoaded(true)

      // Clear the cart after showing the success page
      clearCart()
    } catch (error) {
      console.error("Error loading order data:", error)
      router.push("/cart")
    }
  }, [router, clearCart, dataLoaded])

  // Handle effects after data is loaded
  useEffect(() => {
    if (!dataLoaded) return

    // Play sound
    try {
      playSound("order-complete")
    } catch (error) {
      console.error("Error playing sound:", error)
    }

    // Hide confetti after 8 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false)
    }, 8000)

    // Set PDF ready after a short delay to ensure client-side rendering
    const pdfTimer = setTimeout(() => {
      setIsPdfReady(true)
    }, 1500)

    return () => {
      clearTimeout(confettiTimer)
      clearTimeout(pdfTimer)
    }
  }, [dataLoaded])

  // If no order details, show loading
  if (!orderDetails) {
    return (
      <div className="container flex flex-col items-center justify-center py-8 md:py-16">
        <div className="animate-pulse">
          <div className="h-20 w-20 rounded-full bg-primary/10 mb-4"></div>
          <div className="h-8 w-48 bg-muted rounded mb-4 mx-auto"></div>
          <div className="h-4 w-64 bg-muted rounded mb-4 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="container flex flex-col items-center justify-center py-8 md:py-16 relative overflow-hidden"
    >
      {/* Celebration effects */}
      {showConfetti && <Confetti />}
      <CelebrationEffects duration={10000} />

      <Card className="mx-auto max-w-md w-full text-center relative z-10">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <PartyPopper className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Order Placed Successfully!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Thank you for your order. Your food will be ready for pickup soon!</p>

          {/* Prominent token display with pulse animation */}
          <div className="rounded-lg bg-primary/10 p-6 border-2 border-dashed border-primary token-pulse">
            <p className="font-medium text-lg">Your Collection Token</p>
            <p className="text-5xl font-bold text-primary my-2">{orderToken}</p>
            <p className="text-sm text-muted-foreground mt-1">Show this token when collecting your order</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="font-medium">Order Number</p>
            <p className="text-xl font-bold text-primary">#{orderNumber}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="font-medium">Payment Method</p>
            <p className="text-lg font-medium">
              {orderDetails.paymentMethod === "card"
                ? "Credit/Debit Card"
                : orderDetails.paymentMethod === "upi"
                  ? "UPI"
                  : "Digital Wallet"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link href="/orders" className="w-full">
            <Button className="w-full">Track Your Order</Button>
          </Link>

          <div className="flex w-full gap-2">
            {isPdfReady ? (
              <div className="flex-1">
                <PDFGenerator orderData={mockOrder} orderNumber={orderNumber} />
              </div>
            ) : (
              <Button variant="outline" className="flex-1" disabled>
                <Download className="mr-2 h-4 w-4" />
                Preparing Receipt...
              </Button>
            )}

            <Button variant="outline" className="flex-1" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>

          <Link href="/" className="w-full">
            <Button variant="ghost" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
