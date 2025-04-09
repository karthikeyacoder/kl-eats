"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Package, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import the playSound utility
import { playSound } from "@/lib/sound-utils"

// Mock data with Indian names and consistent canteen names
const allOrders = [
  {
    id: "ORD123456",
    date: "2023-03-15T14:30:00",
    status: "completed",
    total: 599,
    items: [
      {
        id: "101",
        name: "Chicken Biryani",
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
    canteenId: "1",
    canteen: "KL Adda",
    customer: {
      name: "Karthikeya Reddy",
      email: "karthikeya@klu.ac.in",
      phone: "9876543210",
    },
    deliveryAddress: "Room 203, Boys Hostel, KL University Campus",
    deliveryFee: 40,
  },
  {
    id: "ORD123457",
    date: "2023-03-18T12:15:00",
    status: "pending",
    total: 438,
    items: [
      {
        id: "101",
        name: "Chicken Burger",
        price: 199,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "103",
        name: "Grilled Sandwich",
        price: 129,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteenId: "1",
    canteen: "KL Adda",
    customer: {
      name: "Nithya Sri",
      email: "nithya@klu.ac.in",
      phone: "9876543211",
    },
    deliveryAddress: "Room 105, Girls Hostel, KL University Campus",
    deliveryFee: 40,
  },
  {
    id: "ORD123458",
    date: "2023-03-20T18:45:00",
    status: "pending",
    total: 747,
    items: [
      {
        id: "102",
        name: "Veggie Wrap",
        price: 149,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "104",
        name: "Fresh Fruit Juice",
        price: 89,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteenId: "2",
    canteen: "KL Main Canteen",
    customer: {
      name: "Sripath Roy",
      email: "sripath@klu.ac.in",
      phone: "9876543212",
    },
    deliveryAddress: "Room 302, Boys Hostel, KL University Campus",
    deliveryFee: 40,
  },
  {
    id: "ORD123459",
    date: "2023-03-21T14:30:00",
    status: "pending",
    total: 499,
    items: [
      {
        id: "301",
        name: "Veg Pulao",
        price: 159,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "302",
        name: "Masala Chai",
        price: 49,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    canteenId: "3",
    canteen: "C Second Floor Canteen",
    customer: {
      name: "Lakshmi Prasanna",
      email: "lakshmi@klu.ac.in",
      phone: "9876543213",
    },
    deliveryAddress: "Room 405, Girls Hostel, KL University Campus",
    deliveryFee: 40,
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function AdminOrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState<any[]>(allOrders)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false)

  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Update the handleUpdateStatus function to play a sound
  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedOrder) return

    setOrders((prev) => prev.map((order) => (order.id === selectedOrder.id ? { ...order, status: newStatus } : order)))

    setIsUpdateStatusDialogOpen(false)

    // Play status update sound
    playSound("status-update")

    toast({
      title: "Order status updated",
      description: `Order #${selectedOrder.id} status has been updated to ${newStatus}.`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Orders</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <Button variant={activeTab === "all" ? "default" : "outline"} onClick={() => setActiveTab("all")}>
          All Orders
        </Button>
        <Button variant={activeTab === "pending" ? "default" : "outline"} onClick={() => setActiveTab("pending")}>
          Pending
        </Button>
        <Button variant={activeTab === "completed" ? "default" : "outline"} onClick={() => setActiveTab("completed")}>
          Completed
        </Button>
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">No orders found</h2>
            <p className="mb-8 text-muted-foreground">
              There are no {activeTab !== "all" ? activeTab : ""} orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>Placed on {formatDate(order.date)}</CardDescription>
                    </div>
                    <Badge
                      className={order.status === "completed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}
                    >
                      {order.status === "completed" ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Completed
                        </>
                      ) : (
                        "Pending"
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 font-semibold">Items</h3>
                    <div className="space-y-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
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
                      <h3 className="mb-2 font-semibold">Customer Information</h3>
                      <p className="text-sm">
                        <span className="font-medium">Name:</span> {order.customer.name}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span> {order.customer.email}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Phone:</span> {order.customer.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Order Summary</h3>
                      <p className="text-sm">
                        <span className="font-medium">Canteen:</span> {order.canteen}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Subtotal:</span> {formatPrice(order.total - order.deliveryFee)}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Delivery Fee:</span> {formatPrice(order.deliveryFee)}
                      </p>
                      <p className="text-sm font-medium">
                        <span className="font-medium">Total:</span> {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 px-6 py-4">
                  {order.status !== "completed" && (
                    <Button
                      variant="outline"
                      className="ml-auto"
                      onClick={() => {
                        setSelectedOrder(order)
                        setIsUpdateStatusDialogOpen(true)
                      }}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>Change the status of order #{selectedOrder?.id}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="status">New Status</Label>
            <Select onValueChange={(value) => handleUpdateStatus(value)} defaultValue="completed">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateStatusDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
