
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

export function RestaurantList({ cityName }) {
  // In a real application, these would be fetched from an API or database
  const restaurants = [
    { id: 1, name: "The Local Bistro", cuisine: "American", rating: 4.5 },
    { id: 2, name: "Sushi Haven", cuisine: "Japanese", rating: 4.7 },
    { id: 3, name: "Pasta Paradise", cuisine: "Italian", rating: 4.3 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Restaurants in {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{restaurant.name}</h3>
                <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

