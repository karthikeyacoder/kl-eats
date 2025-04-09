import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

// Mock data with updated canteen names
const canteens = [
  {
    id: "1",
    name: "KL Adda",
    description: "Main canteen serving fresh and healthy meals daily",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    location: "Main Building, Ground Floor",
    openingHours: "8:00 AM - 8:00 PM",
  },
  {
    id: "2",
    name: "KL Main Canteen",
    description: "Main canteen with a variety of food options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    location: "Main Building, First Floor",
    openingHours: "9:00 AM - 6:00 PM",
  },
  {
    id: "3",
    name: "C Second Floor Canteen",
    description: "Vegetarian and vegan options",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    location: "C Block, Second Floor",
    openingHours: "8:30 AM - 7:30 PM",
  },
  {
    id: "4",
    name: "C 4th Floor Canteen",
    description: "Authentic international cuisine",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.3,
    location: "C Block, Fourth Floor",
    openingHours: "10:00 AM - 9:00 PM",
  },
  {
    id: "5",
    name: "C 5th Floor Canteen",
    description: "A blend of cuisines from around the world",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    location: "C Block, Fifth Floor",
    openingHours: "9:00 AM - 10:00 PM",
  },
  {
    id: "6",
    name: "Satish Canteen",
    description: "Fast food for students on the go",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.1,
    location: "Satish Building, Ground Floor",
    openingHours: "7:30 AM - 8:00 PM",
  },
  {
    id: "7",
    name: "RND 1st Floor Canteen",
    description: "Research and Development block canteen",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.4,
    location: "RND Block, First Floor",
    openingHours: "8:00 AM - 7:00 PM",
  },
]

export default function CanteensPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">All Canteens</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <strong>Location:</strong> {canteen.location}
                  </p>
                  <p>
                    <strong>Hours:</strong> {canteen.openingHours}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
