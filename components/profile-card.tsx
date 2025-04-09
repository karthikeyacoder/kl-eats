"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, LogOut, Settings, ShoppingBag } from "lucide-react"
import { useUser } from "@/lib/user-context"

export default function ProfileCard() {
  const { user, logout, isLoggedIn } = useUser()
  const router = useRouter()

  if (!isLoggedIn || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
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

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (user.role === "admin") {
      return "/admin/dashboard"
    } else if (user.role === "canteen_owner" && user.canteenId) {
      return `/canteen-owner/dashboard?canteenId=${user.canteenId}`
    }
    return "/orders"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          {user.phone && <p className="text-xs leading-none text-muted-foreground">{user.phone}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={getDashboardLink()}>
            {user.role === "customer" ? (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </>
            )}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
