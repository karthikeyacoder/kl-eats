"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Clock, MapPin, Plus, ArrowLeft, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart, type FoodItem } from "@/lib/cart-context"
import { Input } from "@/components/ui/input"

// Import the playSound utility
import { playSound } from "@/lib/sound-utils"

// Mock data with updated canteen names
const canteens = [
  {
    id: "1",
    name: "KL Adda",
    description: "Main canteen serving fresh and healthy meals daily",
    image: "/placeholder.svg?height=300&width=600",
    rating: 4.5,
    location: "Main Building, Ground Floor",
    openingHours: "8:00 AM - 8:00 PM",
    categories: ["all", "breakfast", "lunch", "dinner", "snacks", "beverages"],
  },
  {
    id: "2",
    name: "KL Main Canteen",
    description: "Main canteen with a variety of food options",
    image: "/placeholder.svg?height=300&width=600",
    rating: 4.2,
    location: "Main Building, First Floor",
    openingHours: "9:00 AM - 6:00 PM",
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    description: "Vegetarian and vegan options",
    image: "/placeholder.svg?height=300&width=600",
    rating: 4.7,
    location: "C Block, Second Floor",
    openingHours: "8:30 AM - 7:30 PM",
    categories: ["all", "snacks", "beverages", "others"],
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    description: "Authentic international cuisine",
    image: "/placeholder.svg?height=300&width=600",
    rating: 4.3,
    location: "C Block, Fourth Floor",
    openingHours: "10:00 AM - 9:00 PM",
    categories: ["all", "snacks", "beverages", "others"],
  },
]

// Updated food items with Indian dishes
const foodItems: Record<string, FoodItem[]> = {
  "1": [
    {
      id: "101",
      name: "Chicken Biryani",
      description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
      price: 199,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.8,
      category: "lunch",
    },
    {
      id: "102",
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato filling, served with chutney and sambar",
      price: 149,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.5,
      category: "breakfast",
    },
    {
      id: "103",
      name: "Paneer Butter Masala",
      description: "Cottage cheese cubes in a rich, creamy tomato gravy",
      price: 179,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.6,
      category: "lunch",
    },
    {
      id: "104",
      name: "Masala Chai",
      description: "Traditional Indian spiced tea with milk",
      price: 49,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.7,
      category: "beverages",
    },
    {
      id: "105",
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: 39,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.5,
      category: "snacks",
    },
    {
      id: "106",
      name: "Gulab Jamun",
      description: "Deep-fried milk solids soaked in sugar syrup",
      price: 59,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "1",
      canteenName: "KL Adda",
      rating: 4.9,
      category: "snacks",
    },
  ],
  "2": [
    {
      id: "201",
      name: "Veg Pulao",
      description: "Fragrant rice cooked with mixed vegetables and mild spices",
      price: 159,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "2",
      canteenName: "KL Main Canteen",
      rating: 4.4,
      category: "lunch",
    },
    {
      id: "202",
      name: "Chicken Curry",
      description: "Tender chicken pieces cooked in a flavorful curry sauce",
      price: 189,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "2",
      canteenName: "KL Main Canteen",
      rating: 4.3,
      category: "lunch",
    },
    {
      id: "203",
      name: "Idli Sambar",
      description: "Steamed rice cakes served with lentil soup and coconut chutney",
      price: 99,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "2",
      canteenName: "KL Main Canteen",
      rating: 4.5,
      category: "breakfast",
    },
  ],
  "3": [
    {
      id: "301",
      name: "Veg Thali",
      description: "Complete meal with rice, roti, dal, sabzi, raita, and dessert",
      price: 249,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "3",
      canteenName: "C Second Floor Canteen",
      rating: 4.6,
      category: "lunch",
    },
    {
      id: "302",
      name: "Pav Bhaji",
      description: "Spiced vegetable mash served with buttered bread rolls",
      price: 129,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "3",
      canteenName: "C Second Floor Canteen",
      rating: 4.5,
      category: "snacks",
    },
    {
      id: "303",
      name: "Lassi",
      description: "Sweet or salted yogurt-based drink",
      price: 69,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "3",
      canteenName: "C Second Floor Canteen",
      rating: 4.7,
      category: "beverages",
    },
  ],
  "4": [
    {
      id: "401",
      name: "Hyderabadi Biryani",
      description: "Authentic Hyderabadi style biryani with tender meat and aromatic spices",
      price: 249,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "4",
      canteenName: "C 4th Floor Canteen",
      rating: 4.9,
      category: "lunch",
    },
    {
      id: "402",
      name: "Andhra Meals",
      description: "Spicy Andhra style complete meal with rice, pappu, vegetables, and pickle",
      price: 199,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "4",
      canteenName: "C 4th Floor Canteen",
      rating: 4.8,
      category: "lunch",
    },
    {
      id: "403",
      name: "Pesarattu",
      description: "Green gram dosa served with ginger chutney",
      price: 119,
      image: "/placeholder.svg?height=150&width=150",
      canteenId: "4",
      canteenName: "C 4th Floor Canteen",
      rating: 4.7,
      category: "breakfast",
    },
  ],
}

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function CanteenPageClient() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([])
  const { toast } = useToast()
  const [hasMounted, setHasMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const canteenId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : ""
  const canteen = canteens.find((c) => c.id === canteenId)

  const handleAddToCart = useCallback(
    (item: FoodItem) => {
      addToCart(item)

      // Play add to cart sound
      playSound("add-to-cart")

      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      })
    },
    [addToCart, toast],
  )

  useEffect(() => {
    setHasMounted(true)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  useEffect(() => {
    if (!canteenId) return

    const items = foodItems[canteenId] || []

    // Filter by category and search query
    let filtered = items

    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.category === activeTab)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }, [activeTab, canteenId, searchQuery])

  if (!hasMounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <div className="h-10 w-40 bg-muted animate-pulse rounded mb-4"></div>
          <div className="relative h-64 w-full bg-muted animate-pulse rounded-lg mb-6"></div>
          <div className="h-8 w-3/4 bg-muted animate-pulse rounded mb-2"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded mb-4"></div>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="h-6 w-20 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
          </div>
          <div className="h-10 w-full bg-muted animate-pulse rounded mb-6"></div>
          <div className="h-12 w-full bg-muted animate-pulse rounded mb-6"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!canteen) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Canteen not found</h1>
        <p className="mb-8">The canteen you are looking for does not exist.</p>
        <Link href="/canteens">
          <Button>Back to Canteens</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/canteens">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Canteens
          </Button>
        </Link>

        <div className="relative mb-6 h-48 w-full overflow-hidden rounded-lg md:h-64 lg:h-80">
          <Image src={canteen.image || "/placeholder.svg"} alt={canteen.name} fill className="object-cover" />
        </div>

        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">{canteen.name}</h1>
          <p className="mb-4 text-muted-foreground">{canteen.description}</p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{canteen.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{canteen.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>{canteen.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for food items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="mb-6 inline-flex w-auto">
              {canteen.categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden transition-all hover:shadow-md">
                    <div className="flex p-4">
                      <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <p className="mt-auto font-bold text-primary">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <CardFooter className="border-t bg-muted/50 px-4 py-3">
                      <Button variant="default" className="w-full" onClick={() => handleAddToCart(item)}>
                        <Plus className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="mb-4 text-lg font-semibold">No items found</p>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try a different search term or category" : "No items available in this category"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
