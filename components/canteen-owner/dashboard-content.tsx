"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BarChart } from "@/components/ui/chart"
import { ShoppingBag, DollarSign, TrendingUp, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data with updated canteen names
const canteens = [
  {
    id: "1",
    name: "KL Adda",
    description: "Main canteen serving fresh and healthy meals daily",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    location: "Main Building, Ground Floor",
    openingHours: "8:00 AM - 8:00 PM",
    isOpen: true,
    categories: ["all", "breakfast", "lunch", "dinner", "snacks", "beverages"],
  },
  {
    id: "2",
    name: "KL Main Canteen",
    description: "Main canteen with a variety of food options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    location: "Main Building, First Floor",
    openingHours: "9:00 AM - 6:00 PM",
    isOpen: true,
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    description: "Vegetarian and vegan options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    location: "C Block, Second Floor",
    openingHours: "8:30 AM - 7:30 PM",
    isOpen: false,
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    description: "Authentic international cuisine",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    location: "C Block, Fourth Floor",
    openingHours: "10:00 AM - 9:00 PM",
    isOpen: true,
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "5",
    name: "C 5th Floor Canteen",
    description: "A blend of cuisines from around the world",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    location: "C Block, Fifth Floor",
    openingHours: "9:00 AM - 10:00 PM",
    isOpen: true,
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "6",
    name: "Satish Canteen",
    description: "Fast food for students on the go",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    location: "Satish Building, Ground Floor",
    openingHours: "7:30 AM - 8:00 PM",
    isOpen: true,
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "7",
    name: "RND 1st Floor Canteen",
    description: "Research and Development block canteen",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    location: "RND Block, First Floor",
    openingHours: "8:00 AM - 7:00 PM",
    isOpen: true,
    categories: ["all", "snacks", "beverages", "others"],
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function CanteenOwnerDashboardContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [canteenId, setCanteenId] = useState<string | null>(null)
  const [canteen, setCanteen] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const id = searchParams?.get("canteenId")
    if (id) {
      setCanteenId(id)
      const foundCanteen = canteens.find((c) => c.id === id)
      if (foundCanteen) {
        setCanteen(foundCanteen)
        setIsOpen(foundCanteen.isOpen)
      }
    }
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)
  }, [searchParams]) // Only run when searchParams changes

  // Mock data for charts
  const salesData = [
    {
      name: "Mon",
      total: 2500,
    },
    {
      name: "Tue",
      total: 3200,
    },
    {
      name: "Wed",
      total: 4100,
    },
    {
      name: "Thu",
      total: 3800,
    },
    {
      name: "Fri",
      total: 5200,
    },
    {
      name: "Sat",
      total: 6100,
    },
    {
      name: "Sun",
      total: 4800,
    },
  ]

  const popularItems = [
    {
      name: "Chicken Burger",
      value: 35,
    },
    {
      name: "Veggie Wrap",
      value: 25,
    },
    {
      name: "Fresh Fruit Juice",
      value: 20,
    },
    {
      name: "Grilled Sandwich",
      value: 15,
    },
    {
      name: "Samosa",
      value: 5,
    },
  ]

  const handleToggleOpen = (checked: boolean) => {
    setIsOpen(checked)
    toast({
      title: checked ? "Canteen Opened" : "Canteen Closed",
      description: `Your canteen is now ${checked ? "open" : "closed"} for orders.`,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
          <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 w-32 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-24 bg-muted rounded mb-1"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="h-80 bg-muted animate-pulse rounded"></div>
      </div>
    )
  }

  if (!canteen) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>No canteen selected. Please select a canteen to view the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold md:text-3xl">{canteen.name} Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="canteen-status" className="font-medium">
            {isOpen ? "Open" : "Closed"}
          </Label>
          <Switch id="canteen-status" checked={isOpen} onCheckedChange={handleToggleOpen} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(12450)}</div>
            <p className="text-xs text-muted-foreground">+18.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42</div>
            <p className="text-xs text-muted-foreground">+12.4% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+38</div>
            <p className="text-xs text-muted-foreground">+5.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">+3.1% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Revenue for the current week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              data={salesData}
              index="name"
              categories={["total"]}
              colors={["primary"]}
              valueFormatter={(value) => formatPrice(value)}
              yAxisWidth={60}
              height={350}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most ordered items this week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              data={popularItems}
              index="name"
              categories={["value"]}
              colors={["primary"]}
              valueFormatter={(value) => `${value}%`}
              layout="vertical"
              yAxisWidth={120}
              height={350}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Canteen Information</CardTitle>
            <CardDescription>Current canteen details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-1">
              <p className="font-medium">Location:</p>
              <p>{canteen.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="font-medium">Operating Hours:</p>
              <p>{canteen.openingHours}</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="font-medium">Rating:</p>
              <p>{canteen.rating} / 5</p>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <p className="font-medium">Status:</p>
              <p className={isOpen ? "text-green-600" : "text-red-600"}>{isOpen ? "Open" : "Closed"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest orders and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-muted-foreground">{i * 10} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
