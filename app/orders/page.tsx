"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Package, CheckCircle, Download, FileText } from "lucide-react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import OrderBillPDF from "@/components/order-bill-pdf"

// Mock data
const orders = [
  {
    id: "ORD123456",
    date: "2023-03-15T14:30:00",
    status: "completed",
    total: 599,
    items: [
      {
        id: "101",
        name: "Chicken Burger",
        price: 199,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "104",
        name: "Fresh Fruit Juice",
        price: 89,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteen: "Campus Café",
    deliveryAddress: "Room 203, Student Hostel, University Campus",
    deliveryFee: 40,
  },
  {
    id: "ORD123457",
    date: "2023-03-18T12:15:00",
    status: "completed",
    total: 438,
    items: [
      {
        id: "201",
        name: "Pasta Alfredo",
        price: 199,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteen: "Tech Bites",
    deliveryAddress: "Room 203, Student Hostel, University Campus",
    deliveryFee: 40,
  },
  {
    id: "ORD123458",
    date: "2023-03-20T18:45:00",
    status: "completed",
    total: 747,
    items: [
      {
        id: "301",
        name: "Veggie Pizza",
        price: 249,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "302",
        name: "Tofu Stir Fry",
        price: 199,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteen: "Green Plate",
    deliveryAddress: "Room 203, Student Hostel, University Campus",
    deliveryFee: 40,
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">No orders found</h2>
          <p className="mb-8 text-muted-foreground">You don't have any orders yet.</p>
          <Link href="/canteens">
            <Button>Order Now</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {formatDate(order.date)}</CardDescription>
                  </div>
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Payment Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 font-semibold">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} x {item.quantity}
                          </p>
                        </div>
                        <div className="text-right font-medium">{formatPrice(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">Delivery Address</h3>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Order Details</h3>
                    <p className="text-sm text-muted-foreground">Canteen: {order.canteen}</p>
                    <p className="text-sm font-medium">Total: {formatPrice(order.total)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleViewDetails(order)}>
                      <FileText className="mr-2 h-4 w-4" /> View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Order #{order.id}</DialogTitle>
                      <DialogDescription>Placed on {formatDate(order.date)}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-semibold">Bill Details</h3>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          <div className="my-2 border-t border-gray-200"></div>
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.total - order.deliveryFee)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Delivery Fee</span>
                            <span>{formatPrice(order.deliveryFee)}</span>
                          </div>
                          <div className="my-2 border-t border-gray-200"></div>
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <PDFDownloadLink
                          document={<OrderBillPDF order={order} />}
                          fileName={`order-${order.id}.pdf`}
                          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                          {({ loading }) => (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              {loading ? "Generating PDF..." : "Download Bill"}
                            </>
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
