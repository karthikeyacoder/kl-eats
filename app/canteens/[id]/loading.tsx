import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <Skeleton className="mb-4 h-10 w-40" />
        <Skeleton className="mb-6 h-64 w-full rounded-lg md:h-80" />

        <Skeleton className="mb-2 h-10 w-3/4" />
        <Skeleton className="mb-4 h-6 w-full" />

        <div className="flex flex-wrap gap-4 mb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-32" />
        </div>

        <Skeleton className="mb-6 h-10 w-full" />

        <Skeleton className="mb-6 h-12 w-full" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex">
                  <Skeleton className="h-24 w-24 rounded-md" />
                  <div className="ml-4 flex-1">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-2 h-4 w-1/2" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-4 py-3">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
