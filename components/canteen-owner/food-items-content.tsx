"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
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
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreVertical, Plus, Trash2, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const canteens = [
  {
    id: "1",
    name: "KL Adda",
    categories: ["breakfast", "lunch", "dinner", "snacks", "beverages"],
  },
  {
    id: "2",
    name: "KL Main Canteen",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "5",
    name: "C 5th Floor Canteen",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "6",
    name: "Satish Canteen",
    categories: ["snacks", "beverages", "others"],
  },
  {
    id: "7",
    name: "RND 1st Floor Canteen",
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
    canteenName: "KL Adda",
    rating: 4.8,
    category: "lunch",
    isMostSelling: true,
    isAvailable: true,
  },
  {
    id: "102",
    name: "Veggie Wrap",
    description: "Fresh vegetables wrapped in a tortilla",
    price: 149,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "KL Adda",
    rating: 4.5,
    category: "lunch",
    isMostSelling: false,
    isAvailable: true,
  },
  {
    id: "103",
    name: "Grilled Sandwich",
    description: "Cheese and vegetables grilled to perfection",
    price: 129,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "KL Adda",
    rating: 4.6,
    category: "breakfast",
    isMostSelling: false,
    isAvailable: true,
  },
  {
    id: "104",
    name: "Fresh Fruit Juice",
    description: "Freshly squeezed seasonal fruits",
    price: 89,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "KL Adda",
    rating: 4.7,
    category: "beverages",
    isMostSelling: true,
    isAvailable: true,
  },
  {
    id: "201",
    name: "Pasta Alfredo",
    description: "Creamy pasta with garlic and parmesan",
    price: 199,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "2",
    canteenName: "KL Main Canteen",
    rating: 4.4,
    category: "others",
    isMostSelling: true,
    isAvailable: true,
  },
  {
    id: "301",
    name: "Veggie Pizza",
    description: "Loaded with fresh vegetables and cheese",
    price: 249,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "3",
    canteenName: "C Second Floor Canteen",
    rating: 4.6,
    category: "others",
    isMostSelling: false,
    isAvailable: false,
  },
  {
    id: "401",
    name: "Butter Chicken",
    description: "Creamy tomato sauce with tender chicken",
    price: 299,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "4",
    canteenName: "C 4th Floor Canteen",
    rating: 4.9,
    category: "others",
    isMostSelling: true,
    isAvailable: true,
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function FoodItemsContent() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [canteenId, setCanteenId] = useState<string | null>(null)
  const [canteen, setCanteen] = useState<any>(null)
  const [foodItems, setFoodItems] = useState<any[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    isMostSelling: false,
    isAvailable: true,
  })

  useEffect(() => {
    const id = searchParams.get("canteenId")
    if (id) {
      setCanteenId(id)
      const foundCanteen = canteens.find((c) => c.id === id)
      if (foundCanteen) {
        setCanteen(foundCanteen)
        // Only set food items once to prevent cascading updates
        setFoodItems(initialFoodItems.filter((item) => item.canteenId === id))
      }
    }
  }, [searchParams]) // Only run when searchParams changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const handleAddItem = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image: formData.image || "/placeholder.svg?height=150&width=150",
      canteenId: canteenId || "",
      canteenName: canteen?.name || "",
      rating: 0,
      category: formData.category,
      isMostSelling: formData.isMostSelling,
      isAvailable: formData.isAvailable,
    }

    setFoodItems((prev) => [...prev, newItem])
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      isMostSelling: false,
      isAvailable: true,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Food item added",
      description: "The food item has been added successfully.",
    })
  }

  const handleEditItem = () => {
    if (!selectedItem) return

    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              name: formData.name,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              image: formData.image || item.image,
              category: formData.category,
              isMostSelling: formData.isMostSelling,
              isAvailable: formData.isAvailable,
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
      category: item.category,
      isMostSelling: item.isMostSelling,
      isAvailable: item.isAvailable,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item: any) => {
    setSelectedItem(item)
    setIsDeleteDialogOpen(true)
  }

  const toggleItemAvailability = (item: any) => {
    setFoodItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, isAvailable: !i.isAvailable } : i)))

    toast({
      title: item.isAvailable ? "Item Unavailable" : "Item Available",
      description: `${item.name} is now ${item.isAvailable ? "unavailable" : "available"} for ordering.`,
    })
  }

  const toggleMostSelling = (item: any) => {
    setFoodItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, isMostSelling: !i.isMostSelling } : i)))

    toast({
      title: item.isMostSelling ? "Removed from Most Selling" : "Added to Most Selling",
      description: `${item.name} has been ${item.isMostSelling ? "removed from" : "added to"} most selling items.`,
    })
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
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {canteen.categories.map((category: string) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
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
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="isMostSelling">Most Selling Item</Label>
                  <p className="text-sm text-muted-foreground">Mark this as a most selling item</p>
                </div>
                <Switch
                  id="isMostSelling"
                  checked={formData.isMostSelling}
                  onCheckedChange={(checked) => handleSwitchChange("isMostSelling", checked)}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="isAvailable">Available for Order</Label>
                  <p className="text-sm text-muted-foreground">Make this item available for ordering</p>
                </div>
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => handleSwitchChange("isAvailable", checked)}
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
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {canteen.categories.map((category: string) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`overflow-hidden ${!item.isAvailable ? "opacity-60" : ""}`}>
            <div className="flex p-4">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <div className="ml-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  {item.isMostSelling && (
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Most Selling
                    </span>
                  )}
                </div>
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
                      <DropdownMenuItem onClick={() => toggleItemAvailability(item)}>
                        {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleMostSelling(item)}>
                        {item.isMostSelling ? "Remove from Most Selling" : "Add to Most Selling"}
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
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
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
                  {canteen.categories.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="edit-isMostSelling">Most Selling Item</Label>
                <p className="text-sm text-muted-foreground">Mark this as a most selling item</p>
              </div>
              <Switch
                id="edit-isMostSelling"
                checked={formData.isMostSelling}
                onCheckedChange={(checked) => handleSwitchChange("isMostSelling", checked)}
              />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="edit-isAvailable">Available for Order</Label>
                <p className="text-sm text-muted-foreground">Make this item available for ordering</p>
              </div>
              <Switch
                id="edit-isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={(checked) => handleSwitchChange("isAvailable", checked)}
              />
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
