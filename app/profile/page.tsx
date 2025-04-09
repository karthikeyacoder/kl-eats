"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/lib/user-context"

// Mock previous orders
const previousOrders = [
  {
    id: "ORD123456",
    date: "2023-03-15T14:30:00",
    status: "completed",
    total: 599,
    canteen: "KL Adda",
  },
  {
    id: "ORD123457",
    date: "2023-03-18T12:15:00",
    status: "completed",
    total: 438,
    canteen: "KL Main Canteen",
  },
  {
    id: "ORD123458",
    date: "2023-03-20T18:45:00",
    status: "completed",
    total: 747,
    canteen: "C Second Floor Canteen",
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ProfilePage() {
  const { user, isLoggedIn } = useUser()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) {
    return null
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">My Profile</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Role</p>
                  <Badge className="mt-1">
                    {user.role === "customer" ? "Customer" : user.role === "admin" ? "Administrator" : "Canteen Owner"}
                  </Badge>
                </div>
                {user.role === "canteen_owner" && user.canteenId && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Canteen</p>
                    <p>
                      {user.canteenId === "1"
                        ? "KL Adda"
                        : user.canteenId === "2"
                          ? "KL Main Canteen"
                          : user.canteenId === "3"
                            ? "C Second Floor Canteen"
                            : user.canteenId === "4"
                              ? "C 4th Floor Canteen"
                              : "Unknown Canteen"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/settings">Edit Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="orders">Previous Orders</TabsTrigger>
              <TabsTrigger value="addresses">Saved Addresses</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your previous orders</CardDescription>
                </CardHeader>
                <CardContent>
                  {previousOrders.length > 0 ? (
                    <div className="space-y-4">
                      {previousOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-medium">Order #{order.id}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                            <p className="text-sm">{order.canteen}</p>
                          </div>
                          <div className="mt-2 flex items-center gap-4 sm:mt-0">
                            <Badge className="bg-green-500">Completed</Badge>
                            <p className="font-medium">{formatPrice(order.total)}</p>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${order.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/canteens">Order Now</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your delivery addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Home</p>
                        <p className="text-sm text-muted-foreground">Room 203, Boys Hostel, KL University Campus</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Add New Address
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
