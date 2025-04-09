"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

// Mock data with consistent canteen names
const canteens = [
  {
    id: "1",
    name: "KL Adda",
    description: "Main canteen serving fresh and healthy meals daily",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
  },
  {
    id: "2",
    name: "KL Main Canteen",
    description: "Main canteen with a variety of food options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    description: "Vegetarian and vegan options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    description: "Authentic international cuisine",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
  },
]

// Popular items with Indian dishes
const popularItems = [
  {
    id: "1",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken and aromatic spices",
    price: 199,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "1",
    canteenName: "KL Adda",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato filling",
    price: 149,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "3",
    canteenName: "C Second Floor Canteen",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Hyderabadi Biryani",
    description: "Authentic Hyderabadi style biryani with tender meat and aromatic spices",
    price: 249,
    image: "/placeholder.svg?height=150&width=150",
    canteenId: "4",
    canteenName: "C 4th Floor Canteen",
    rating: 4.9,
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Food background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Delicious Food at Your Fingertips</h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Order from your favorite canteens and have your food delivered right to you.
          </p>
          <Link href="/canteens">
            <Button size="lg" className="text-lg">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Canteens Section */}
      <section className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Our Canteens</h2>
          <Link href="/canteens">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {canteens.map((canteen) => (
            <Link key={canteen.id} href={`/canteens/${canteen.id}`}>
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 w-full">
                  <Image src={canteen.image || "/placeholder.svg"} alt={canteen.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{canteen.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{canteen.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{canteen.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="container">
        <h2 className="mb-8 text-3xl font-bold">Most Popular Items</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex p-4">
                <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="ml-4 flex flex-col">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.canteenName}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                  <p className="mt-auto font-bold text-primary">{formatPrice(item.price)}</p>
                </div>
              </div>
              <CardFooter className="border-t bg-muted/50 px-4 py-3">
                <Link href={`/canteens/${item.canteenId}`} className="w-full">
                  <Button variant="default" className="w-full">
                    Order Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
