"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Mock data - in a real app, this would come from an API
const allFoodItems = [
  {
    id: "101",
    name: "Chicken Burger",
    description: "Juicy chicken patty with fresh veggies",
    price: 199,
    canteenId: "1",
    canteenName: "KL Adda",
    category: "lunch",
  },
  {
    id: "102",
    name: "Veggie Wrap",
    description: "Fresh vegetables wrapped in a tortilla",
    price: 149,
    canteenId: "1",
    canteenName: "KL Adda",
    category: "lunch",
  },
  {
    id: "201",
    name: "Pasta Alfredo",
    description: "Creamy pasta with garlic and parmesan",
    price: 199,
    canteenId: "2",
    canteenName: "KL Main Canteen",
    category: "others",
  },
  {
    id: "301",
    name: "Veggie Pizza",
    description: "Loaded with fresh vegetables and cheese",
    price: 249,
    canteenId: "3",
    canteenName: "C Second Floor Canteen",
    category: "others",
  },
]

// Format price to Indian Rupees
function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`
}

interface GlobalSearchProps {
  onClose?: () => void
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof allFoodItems>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const isMobile = typeof onClose !== "undefined"

  // Simple debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length === 0) {
        setResults([])
        return
      }

      const searchResults = allFoodItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.canteenName.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(searchResults)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    // Focus the input when the component mounts (for mobile)
    if (isMobile && inputRef.current) {
      inputRef.current.focus()
    }

    // Add keyboard shortcut for desktop
    if (!isMobile) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobile])

  const handleSelect = (item: (typeof allFoodItems)[0]) => {
    if (isMobile && onClose) {
      onClose()
    } else {
      setOpen(false)
    }
    router.push(`/canteens/${item.canteenId}`)
  }

  // For mobile view
  if (isMobile) {
    return (
      <div className="relative w-full bg-background rounded-md shadow-lg">
        <div className="flex items-center p-2 border rounded-md">
          <Search className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder="Search for food items, canteens..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {query.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 max-h-[60vh] overflow-y-auto bg-background rounded-md border shadow-lg">
            {results.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">No results found.</p>
            ) : (
              <div className="p-2 space-y-1">
                {results.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.canteenName}</div>
                    </div>
                    <div className="font-medium text-primary">{formatPrice(item.price)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // For desktop view
  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          <Search className="mr-2 h-4 w-4" />
          Search...
        </span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search Food Items</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for food items, canteens..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {results.length === 0 && query !== "" ? (
                <p className="text-center text-sm text-muted-foreground py-4">No results found.</p>
              ) : (
                results.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.canteenName}</div>
                    </div>
                    <div className="font-medium text-primary">{formatPrice(item.price)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
