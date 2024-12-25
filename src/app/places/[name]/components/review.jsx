
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

export function ReviewList({ cityName }) {
  // In a real application, these would be fetched from an API or database
  const reviews = [
    { id: 1, author: "John D.", rating: 5, comment: "Love living in this city! Great community and amenities." },
    { id: 2, author: "Sarah M.", rating: 4, comment: "Beautiful area, but traffic can be a bit heavy during rush hour." },
    { id: 3, author: "Mike R.", rating: 5, comment: "Excellent schools and safe neighborhoods. Highly recommend!" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews of {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-2">
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarFallback>{review.author[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{review.author}</span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

