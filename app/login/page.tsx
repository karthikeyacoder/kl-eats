"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@/lib/user-context"

// Import the playSound utility
import { playSound } from "@/lib/sound-utils"

// Mock user credentials with Indian names
const userCredentials = [
  {
    id: "1",
    email: "karthikeya@klu.ac.in",
    password: "user123",
    role: "customer",
    name: "Karthikeya Reddy",
    phone: "9876543210",
  },
  {
    id: "2",
    email: "admin@klu.ac.in",
    password: "admin123",
    role: "admin",
    name: "Sripath Roy",
    phone: "9876543211",
  },
  {
    id: "3",
    email: "canteen1@klu.ac.in",
    password: "canteen123",
    role: "canteen_owner",
    canteenId: "1",
    name: "Nithya Sri",
    phone: "9876543212",
  },
  {
    id: "4",
    email: "canteen2@klu.ac.in",
    password: "canteen123",
    role: "canteen_owner",
    canteenId: "2",
    name: "Venkat Narayana",
    phone: "9876543213",
  },
  {
    id: "5",
    email: "canteen3@klu.ac.in",
    password: "canteen123",
    role: "canteen_owner",
    canteenId: "3",
    name: "Lakshmi Prasanna",
    phone: "9876543214",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoggedIn } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/")
    }
  }, [isLoggedIn, router])

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  // Update the handleLogin function to use our user context
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Play login sound
    playSound("form-submit")

    // Authenticate user
    const user = userCredentials.find((user) => user.email === loginData.email && user.password === loginData.password)

    setTimeout(() => {
      setIsLoading(false)

      if (!user) {
        toast({
          title: "Invalid credentials",
          description: "The email or password you entered is incorrect.",
          variant: "destructive",
        })
        return
      }

      // Login the user with our context
      login({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role as any,
        canteenId: user.canteenId,
      })

      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else if (user.role === "canteen_owner") {
        router.push(`/canteen-owner/dashboard?canteenId=${user.canteenId}`)
      } else {
        router.push("/")
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      })

      // Play success sound
      playSound("login-success")
    }, 1500)
  }

  // Update the handleRegister function to use our user context
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword ||
      !registerData.phone
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Play register sound
    playSound("form-submit")

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)

      // Create a new user
      const newUser = {
        id: (userCredentials.length + 1).toString(),
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        role: "customer" as const,
      }

      // Login the user with our context
      login(newUser)

      router.push("/")

      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      })

      // Play success sound
      playSound("register-success")
    }, 1500)
  }

  return (
    <div className="container flex items-center justify-center py-16">
      <Card className="mx-auto w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@klu.ac.in"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-muted-foreground hover:text-primary">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-1">Demo Credentials:</p>
                  <p>Customer: karthikeya@klu.ac.in / user123</p>
                  <p>Admin: admin@klu.ac.in / admin123</p>
                  <p>Canteen Owner: canteen1@klu.ac.in / canteen123</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Karthikeya Reddy"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="your.email@klu.ac.in"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    name="password"
                    type="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Register"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
