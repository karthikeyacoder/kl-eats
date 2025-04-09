"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { playSound } from "@/lib/sound-utils"

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, totalPrice } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (cart.length === 0) {
      router.push("/cart")
    }
  }, [cart, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Play submission sound if mounted
    if (isMounted) {
      playSound("form-submit")
    }

    // Generate a unique order ID
    const orderId = `ORD${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`

    // Generate a token for collection
    const token =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")

    // Store cart data in sessionStorage for the success page
    sessionStorage.setItem("orderCart", JSON.stringify(cart))
    sessionStorage.setItem("orderTotal", totalPrice.toString())
    sessionStorage.setItem("paymentMethod", paymentMethod)
    sessionStorage.setItem("orderId", orderId)
    sessionStorage.setItem("orderToken", token)
    sessionStorage.setItem("orderDate", new Date().toISOString())

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/order-success")
    }, 1500)
  }

  if (cart.length === 0 && isMounted) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">
                      UPI
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border p-4">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                      Digital Wallet
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>

              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <Link href="/cart">
                  <Button variant="outline">Back to Cart</Button>
                </Link>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="truncate max-w-[70%]">
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice + 40)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
