"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, MoreVertical, Plus, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data with updated canteen names
const initialCanteens = [
  {
    id: "1",
    name: "KL Adda",
    description: "Serving fresh and healthy meals daily",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    location: "Main Building, Ground Floor",
    openingHours: "8:00 AM - 8:00 PM",
    categories: ["all", "breakfast", "lunch", "dinner", "snacks", "beverages"],
  },
  {
    id: "2",
    name: "KL Main Canteen",
    description: "Quick bites for busy students",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    location: "Engineering Block, 1st Floor",
    openingHours: "9:00 AM - 6:00 PM",
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    description: "Vegetarian and vegan options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    location: "Science Block, Ground Floor",
    openingHours: "8:30 AM - 7:30 PM",
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    description: "Authentic international cuisine",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    location: "Arts Building, 2nd Floor",
    openingHours: "10:00 AM - 9:00 PM",
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
    categories: ["all", "snacks", "beverages", "others"],
  },
]

const allCategories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
  { id: "beverages", label: "Beverages" },
  { id: "others", label: "Others" },
]

export default function AdminCanteensPage() {
  const { toast } = useToast()
  const [canteens, setCanteens] = useState(initialCanteens)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCanteen, setSelectedCanteen] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    openingHours: "",
    image: "",
    categories: ["all"] as string[],
  })

  // Filter canteens based on search query
  const filteredCanteens = canteens.filter(
    (canteen) =>
      canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      canteen.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      canteen.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, categoryId] }
      } else {
        return { ...prev, categories: prev.categories.filter((id) => id !== categoryId && id !== "all") }
      }
    })
  }

  const handleAddCanteen = () => {
    if (!formData.name || !formData.description || !formData.location || !formData.openingHours) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Ensure "all" is always included
    let categories = formData.categories
    if (!categories.includes("all")) {
      categories = ["all", ...categories]
    }

    const newCanteen = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      location: formData.location,
      openingHours: formData.openingHours,
      image: formData.image || "/placeholder.svg?height=200&width=300",
      rating: 0,
      categories,
    }

    setCanteens((prev) => [...prev, newCanteen])
    setFormData({
      name: "",
      description: "",
      location: "",
      openingHours: "",
      image: "",
      categories: ["all"],
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Canteen added",
      description: "The canteen has been added successfully.",
    })
  }

  const handleEditCanteen = () => {
    if (!selectedCanteen) return

    if (!formData.name || !formData.description || !formData.location || !formData.openingHours) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Ensure "all" is always included
    let categories = formData.categories
    if (!categories.includes("all")) {
      categories = ["all", ...categories]
    }

    setCanteens((prev) =>
      prev.map((canteen) =>
        canteen.id === selectedCanteen.id
          ? {
              ...canteen,
              name: formData.name,
              description: formData.description,
              location: formData.location,
              openingHours: formData.openingHours,
              image: formData.image || canteen.image,
              categories,
            }
          : canteen,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Canteen updated",
      description: "The canteen has been updated successfully.",
    })
  }

  const handleDeleteCanteen = () => {
    if (!selectedCanteen) return

    setCanteens((prev) => prev.filter((canteen) => canteen.id !== selectedCanteen.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Canteen deleted",
      description: "The canteen has been deleted successfully.",
    })
  }

  const openEditDialog = (canteen: any) => {
    setSelectedCanteen(canteen)
    setFormData({
      name: canteen.name,
      description: canteen.description,
      location: canteen.location,
      openingHours: canteen.openingHours,
      image: canteen.image,
      categories: canteen.categories,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (canteen: any) => {
    setSelectedCanteen(canteen)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold md:text-3xl">Manage Canteens</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Canteen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Canteen</DialogTitle>
              <DialogDescription>Fill in the details to add a new canteen.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="openingHours">Opening Hours</Label>
                <Input
                  id="openingHours"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=200&width=300"
                />
              </div>
              <div className="grid gap-2">
                <Label>Available Categories</Label>
                <div className="grid grid-cols-2 gap-2">
                  {allCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={formData.categories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCanteen}>Add Canteen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search canteens..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCanteens.map((canteen) => (
          <Card key={canteen.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={canteen.image || "/placeholder.svg"} alt={canteen.name} fill className="object-cover" />
            </div>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>{canteen.name}</CardTitle>
                <CardDescription>{canteen.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEditDialog(canteen)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(canteen)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Location:</strong> {canteen.location}
                </p>
                <p>
                  <strong>Hours:</strong> {canteen.openingHours}
                </p>
                <p>
                  <strong>Rating:</strong> {canteen.rating}
                </p>
                <p>
                  <strong>Categories:</strong>{" "}
                  {canteen.categories
                    .filter((c) => c !== "all")
                    .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
                    .join(", ")}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => openEditDialog(canteen)}>
                Edit Canteen
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCanteens.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="mb-4 text-lg font-semibold">No canteens found</p>
          <p className="mb-8 text-muted-foreground">Try adjusting your search criteria.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Canteen</DialogTitle>
            <DialogDescription>Update the canteen details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input id="edit-location" name="location" value={formData.location} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-openingHours">Opening Hours</Label>
              <Input
                id="edit-openingHours"
                name="openingHours"
                value={formData.openingHours}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label>Available Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {allCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-category-${category.id}`}
                      checked={formData.categories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <Label htmlFor={`edit-category-${category.id}`} className="text-sm">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCanteen}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Canteen</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this canteen? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCanteen}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
