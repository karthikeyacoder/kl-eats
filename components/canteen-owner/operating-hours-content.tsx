"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

// Mock data
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

export default function OperatingHoursContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [canteenId, setCanteenId] = useState<string | null>(null)
  const [canteen, setCanteen] = useState<any>(null)
  const [formData, setFormData] = useState({
    location: "",
    openingHours: "",
    description: "",
    isOpen: true,
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const id = searchParams.get("canteenId")
    if (id) {
      setCanteenId(id)
      const foundCanteen = canteens.find((c) => c.id === id)
      if (foundCanteen) {
        setCanteen(foundCanteen)
        // Set form data only once to prevent cascading updates
        setFormData({
          location: foundCanteen.location,
          openingHours: foundCanteen.openingHours,
          description: foundCanteen.description,
          isOpen: foundCanteen.isOpen,
        })
      }
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isOpen: checked }))
  }

  const handleSave = () => {
    if (!formData.location || !formData.openingHours || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would update the canteen in the database
    setCanteen({
      ...canteen,
      location: formData.location,
      openingHours: formData.openingHours,
      description: formData.description,
      isOpen: formData.isOpen,
    })

    setIsEditing(false)

    toast({
      title: "Changes saved",
      description: "Your canteen information has been updated successfully.",
    })
  }

  const handleCancel = () => {
    // Reset form data to current canteen values
    if (canteen) {
      setFormData({
        location: canteen.location,
        openingHours: canteen.openingHours,
        description: canteen.description,
        isOpen: canteen.isOpen,
      })
    }
    setIsEditing(false)
  }

  if (!canteen) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading canteen information...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Operating Hours & Location</h1>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Edit Information</Button>}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Canteen Information</CardTitle>
          <CardDescription>Manage your canteen's location, operating hours, and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openingHours">Operating Hours</Label>
            <Input
              id="openingHours"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="e.g., 8:00 AM - 8:00 PM"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="isOpen">Canteen Status</Label>
              <p className="text-sm text-muted-foreground">Set your canteen as open or closed for orders</p>
            </div>
            <Switch id="isOpen" checked={formData.isOpen} onCheckedChange={handleSwitchChange} disabled={!isEditing} />
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
          <CardDescription>Your canteen's current information as seen by customers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Name:</p>
            <p>{canteen.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Location:</p>
            <p>{canteen.location}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Operating Hours:</p>
            <p>{canteen.openingHours}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Description:</p>
            <p>{canteen.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Status:</p>
            <p className={canteen.isOpen ? "text-green-600" : "text-red-600"}>{canteen.isOpen ? "Open" : "Closed"}</p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <p className="font-medium">Rating:</p>
            <p>{canteen.rating} / 5</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
