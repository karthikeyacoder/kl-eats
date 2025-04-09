"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart, Home, Package, ShoppingBag, Settings, LogOut, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: BarChart,
  },
  {
    title: "Canteens",
    href: "/admin/canteens",
    icon: Home,
  },
  {
    title: "Food Items",
    href: "/admin/food-items",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-bold text-primary">Admin Dashboard</h2>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start">
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t p-4">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 border-r bg-background md:block">
        <SidebarContent />
      </aside>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="absolute left-4 top-4 md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
