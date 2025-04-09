"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data with consistent canteen names
const canteens = [
  { id: "1", name: "KL Adda" },
  { id: "2", name: "KL Main Canteen" },
  { id: "3", name: "C Second Floor Canteen" },
  { id: "4", name: "C 4th Floor Canteen" },
]

// Mock data with Indian names
const initialCanteenOwners = [
  {
    id: "1",
    name: "Nithya Sri",
    email: "nithya@klu.ac.in",
    canteenId: "1",
    canteenName: "KL Adda",
    status: "active",
  },
  {
    id: "2",
    name: "Venkat Narayana",
    email: "venkat@klu.ac.in",
    canteenId: "2",
    canteenName: "KL Main Canteen",
    status: "active",
  },
  {
    id: "3",
    name: "Lakshmi Prasanna",
    email: "lakshmi@klu.ac.in",
    canteenId: "3",
    canteenName: "C Second Floor Canteen",
    status: "pending",
  },
  {
    id: "4",
    name: "Ramesh Kumar",
    email: "ramesh@klu.ac.in",
    canteenId: "4",
    canteenName: "C 4th Floor Canteen",
    status: "inactive",
  },
]

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [canteenOwners, setCanteenOwners] = useState(initialCanteenOwners)
  const [isAddOwnerDialogOpen, setIsAddOwnerDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    canteenId: "",
  })

  const [settings, setSettings] = useState({
    enableNotifications: true,
    enableOrderTracking: true,
    enableRatings: true,
    enableUserRegistration: true,
    maintenanceMode: false,
    darkMode: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }))

    toast({
      title: "Setting updated",
      description: `${name} has been ${checked ? "enabled" : "disabled"}.`,
    })
  }

  const handleAddCanteenOwner = () => {
    if (!formData.name || !formData.email || !formData.canteenId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const selectedCanteen = canteens.find((c) => c.id === formData.canteenId)

    const newOwner = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      canteenId: formData.canteenId,
      canteenName: selectedCanteen?.name || "",
      status: "pending",
    }

    setCanteenOwners((prev) => [...prev, newOwner])
    setFormData({
      name: "",
      email: "",
      canteenId: "",
    })
    setIsAddOwnerDialogOpen(false)

    toast({
      title: "Canteen owner added",
      description: "The canteen owner has been added successfully.",
    })
  }

  const handleToggleOwnerStatus = (id: string) => {
    setCanteenOwners((prev) =>
      prev.map((owner) =>
        owner.id === id ? { ...owner, status: owner.status === "active" ? "inactive" : "active" } : owner,
      ),
    )

    const owner = canteenOwners.find((o) => o.id === id)
    const newStatus = owner?.status === "active" ? "inactive" : "active"

    toast({
      title: "Owner status updated",
      description: `${owner?.name}'s access has been ${newStatus}.`,
    })
  }

  const handleDeleteOwner = (id: string) => {
    const owner = canteenOwners.find((o) => o.id === id)

    setCanteenOwners((prev) => prev.filter((o) => o.id !== id))

    toast({
      title: "Owner removed",
      description: `${owner?.name} has been removed from canteen owners.`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="access">Access Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general settings for the KL-Eats platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableNotifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications to users about their orders.</p>
                </div>
                <Switch
                  id="enableNotifications"
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleSwitchChange("enableNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableOrderTracking">Enable Order Tracking</Label>
                  <p className="text-sm text-muted-foreground">Allow users to track their orders in real-time.</p>
                </div>
                <Switch
                  id="enableOrderTracking"
                  checked={settings.enableOrderTracking}
                  onCheckedChange={(checked) => handleSwitchChange("enableOrderTracking", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableRatings">Enable Ratings</Label>
                  <p className="text-sm text-muted-foreground">Allow users to rate food items and canteens.</p>
                </div>
                <Switch
                  id="enableRatings"
                  checked={settings.enableRatings}
                  onCheckedChange={(checked) => handleSwitchChange("enableRatings", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the website in maintenance mode.</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSwitchChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the appearance of the KL-Eats platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode for the admin dashboard.</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Canteen Owner Access</CardTitle>
              <CardDescription>Manage access for canteen owners to their respective portals.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Grant access to canteen owners to manage their canteens.
                </p>
                <Dialog open={isAddOwnerDialogOpen} onOpenChange={setIsAddOwnerDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" /> Add Canteen Owner
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Canteen Owner</DialogTitle>
                      <DialogDescription>Grant access to a canteen owner to manage their canteen.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Karthikeya Reddy"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="email@klu.ac.in"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="canteenId">Canteen</Label>
                        <Select
                          value={formData.canteenId}
                          onValueChange={(value) => handleSelectChange("canteenId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a canteen" />
                          </SelectTrigger>
                          <SelectContent>
                            {canteens.map((canteen) => (
                              <SelectItem key={canteen.id} value={canteen.id}>
                                {canteen.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddOwnerDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCanteenOwner}>Add Owner</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Canteen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {canteenOwners.map((owner) => (
                      <TableRow key={owner.id}>
                        <TableCell className="font-medium">{owner.name}</TableCell>
                        <TableCell>{owner.email}</TableCell>
                        <TableCell>{owner.canteenName}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              owner.status === "active"
                                ? "bg-green-100 text-green-800"
                                : owner.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {owner.status.charAt(0).toUpperCase() + owner.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleToggleOwnerStatus(owner.id)}>
                            {owner.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDeleteOwner(owner.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>Control user registration settings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="enableUserRegistration">Enable User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register on the platform.</p>
                </div>
                <Switch
                  id="enableUserRegistration"
                  checked={settings.enableUserRegistration}
                  onCheckedChange={(checked) => handleSwitchChange("enableUserRegistration", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage security settings for the KL-Eats platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Update Password
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Enable two-factor authentication for added security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Two-factor authentication is not enabled</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Enable 2FA
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
