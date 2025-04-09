"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { playSound } from "@/lib/sound-utils"

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/checkout")
    }, 800)
  }

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId)
    if (isMounted) {
      // Only try to play sound after component is mounted
      playSound("remove-from-cart")
    }
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity)
    if (isMounted && quantity > 0) {
      // Only try to play sound after component is mounted
      playSound("update-cart")
    }
  }

  const handleClearCart = () => {
    clearCart()
    if (isMounted) {
      // Only try to play sound after component is mounted
      playSound("clear-cart")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="mb-8 text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/canteens">
          <Button>Browse Canteens</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">Your Cart</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.canteenName}</p>
                    <p className="font-medium text-primary">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive ml-auto sm:ml-0"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
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
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Order Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
