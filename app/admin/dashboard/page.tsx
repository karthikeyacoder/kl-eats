"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  // Mock data for charts
  const salesData = [
    {
      name: "Jan",
      total: 1200,
    },
    {
      name: "Feb",
      total: 1800,
    },
    {
      name: "Mar",
      total: 2200,
    },
    {
      name: "Apr",
      total: 2600,
    },
    {
      name: "May",
      total: 3200,
    },
    {
      name: "Jun",
      total: 3800,
    },
  ]

  const ordersData = [
    {
      name: "Mon",
      total: 45,
    },
    {
      name: "Tue",
      total: 52,
    },
    {
      name: "Wed",
      total: 61,
    },
    {
      name: "Thu",
      total: 58,
    },
    {
      name: "Fri",
      total: 78,
    },
    {
      name: "Sat",
      total: 91,
    },
    {
      name: "Sun",
      total: 74,
    },
  ]

  const canteenPerformance = [
    {
      name: "Campus Café",
      value: 35,
    },
    {
      name: "Tech Bites",
      value: 25,
    },
    {
      name: "Green Plate",
      value: 22,
    },
    {
      name: "Spice Corner",
      value: 18,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+12.4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">+18.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">+3.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={salesData}
                  index="name"
                  categories={["total"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `$${value}`}
                  yAxisWidth={60}
                  height={350}
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Daily orders for the current week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={ordersData}
                  index="name"
                  categories={["total"]}
                  colors={["primary"]}
                  valueFormatter={(value) => `${value} orders`}
                  yAxisWidth={40}
                  height={350}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Canteen Performance</CardTitle>
                <CardDescription>Sales distribution by canteen</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChart
                  data={canteenPerformance}
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
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user and order activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-muted-foreground">{i * 10} minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analysis of sales and user behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Advanced analytics dashboard is under development</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
