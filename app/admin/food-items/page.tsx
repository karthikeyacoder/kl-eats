"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Plus, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const canteens = [
  {
    id: "1",
    name: "Campus Café",
    categories: ["breakfast", "lunch", "dinner", "snacks", "beverages"],
  },
  {
    id: "2",
    name: "Tech Bites",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "3",
    name: "Green Plate",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "4",
    name: "Spice Corner",
    categories: ["snacks", "beverages", "others"],
  },
]

const initialFoodItems = [
  {
    id: "101",
    name: "Chicken Burger",
    description: "Juicy chicken patty with fresh veggies",
    price: 199,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "Campus Café",
    rating: 4.8,
    category: "lunch",
  },
  {
    id: "102",
    name: "Veggie Wrap",
    description: "Fresh vegetables wrapped in a tortilla",
    price: 149,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "Campus Café",
    rating: 4.5,
    category: "lunch",
  },
  {
    id: "201",
    name: "Pasta Alfredo",
    description: "Creamy pasta with garlic and parmesan",
    price: 199,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "2",
    canteenName: "Tech Bites",
    rating: 4.4,
    category: "others",
  },
  {
    id: "301",
    name: "Veggie Pizza",
    description: "Loaded with fresh vegetables and cheese",
    price: 249,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "3",
    canteenName: "Green Plate",
    rating: 4.6,
    category: "others",
  },
  {
    id: "401",
    name: "Butter Chicken",
    description: "Creamy tomato sauce with tender chicken",
    price: 299,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "4",
    canteenName: "Spice Corner",
    rating: 4.9,
    category: "others",
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function AdminFoodItemsPage() {
  const { toast } = useToast()
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCanteen, setFilterCanteen] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    canteenId: "",
    category: "",
    rating: "4.0",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCanteen = filterCanteen === "all" || item.canteenId === filterCanteen

    return matchesSearch && matchesCanteen
  })

  const handleAddItem = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.canteenId || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const selectedCanteen = canteens.find((c) => c.id === formData.canteenId)

    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image: formData.image || "/placeholder.svg?height=150&width=150",
      canteenId: formData.canteenId,
      canteenName: selectedCanteen?.name || "",
      rating: Number.parseFloat(formData.rating),
      category: formData.category,
    }

    setFoodItems((prev) => [...prev, newItem])
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      canteenId: "",
      category: "",
      rating: "4.0",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Food item added",
      description: "The food item has been added successfully.",
    })
  }

  const handleEditItem = () => {
    if (!selectedItem) return

    if (!formData.name || !formData.description || !formData.price || !formData.canteenId || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const selectedCanteen = canteens.find((c) => c.id === formData.canteenId)

    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              name: formData.name,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              image: formData.image || item.image,
              canteenId: formData.canteenId,
              canteenName: selectedCanteen?.name || item.canteenName,
              rating: Number.parseFloat(formData.rating),
              category: formData.category,
            }
          : item,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Food item updated",
      description: "The food item has been updated successfully.",
    })
  }

  const handleDeleteItem = () => {
    if (!selectedItem) return

    setFoodItems((prev) => prev.filter((item) => item.id !== selectedItem.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Food item deleted",
      description: "The food item has been deleted successfully.",
    })
  }

  const openEditDialog = (item: any) => {
    setSelectedItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      image: item.image,
      canteenId: item.canteenId,
      category: item.category,
      rating: item.rating.toString(),
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item: any) => {
    setSelectedItem(item)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Food Items</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Food Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Food Item</DialogTitle>
              <DialogDescription>Fill in the details to add a new food item.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="canteenId">Canteen</Label>
                <Select value={formData.canteenId} onValueChange={(value) => handleSelectChange("canteenId", value)}>
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
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  disabled={!formData.canteenId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.canteenId &&
                      canteens
                        .find((c) => c.id === formData.canteenId)
                        ?.categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <Select value={formData.rating} onValueChange={(value) => handleSelectChange("rating", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => {
                      const rating = (i + 1) / 2
                      return (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating.toFixed(1)}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="/placeholder.svg?height=150&width=150"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Food Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCanteen} onValueChange={setFilterCanteen}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by canteen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Canteens</SelectItem>
            {canteens.map((canteen) => (
              <SelectItem key={canteen.id} value={canteen.id}>
                {canteen.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="flex p-4">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="ml-4 flex flex-col">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="font-bold text-primary">{formatPrice(item.price)}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(item)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(item)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <CardFooter className="border-t bg-muted/50 px-4 py-3 flex justify-between">
              <Link href={`/canteens/${item.canteenId}`}>
                <Button variant="outline" size="sm">
                  View in Canteen
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => openEditDialog(item)}>
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="mb-4 text-lg font-semibold">No food items found</p>
          <p className="mb-8 text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
            <DialogDescription>Update the food item details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-canteenId">Canteen</Label>
              <Select value={formData.canteenId} onValueChange={(value) => handleSelectChange("canteenId", value)}>
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
              <Label htmlFor="edit-price">Price (₹)</Label>
              <Input id="edit-price" name="price" type="number" value={formData.price} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {formData.canteenId &&
                    canteens
                      .find((c) => c.id === formData.canteenId)
                      ?.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-rating">Rating</Label>
              <Select value={formData.rating} onValueChange={(value) => handleSelectChange("rating", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => {
                    const rating = (i + 1) / 2
                    return (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating.toFixed(1)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Food Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this food item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
