"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "customer" | "admin" | "canteen_owner"

export type User = {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  canteenId?: string
}

type UserContextType = {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoggedIn: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Load user from localStorage on client side
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
        setUser(null)
        setIsLoggedIn(false)
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
