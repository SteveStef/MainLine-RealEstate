
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square } from 'lucide-react'
import Image from 'next/image'

export function PropertyList({ cityName }) {
  // In a real application, these would be fetched from an API or database
  const properties = [
    { id: 1, name: "Luxury Apartment", price: 500000, beds: 3, baths: 2, sqft: 1500 },
    { id: 2, name: "Family Home", price: 750000, beds: 4, baths: 3, sqft: 2200 },
    { id: 3, name: "Downtown Condo", price: 400000, beds: 2, baths: 2, sqft: 1200 },
  ]

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Properties in {cityName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader className="p-0">
              <Image
                src={`/placeholder.svg?height=200&width=300&text=Property+${property.id}`}
                alt={property.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{property.name}</CardTitle>
              <p className="text-xl font-bold mb-2">${property.price.toLocaleString()}</p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {property.beds}</span>
                <span className="flex items-center"><Bath className="w-4 h-4 mr-1" /> {property.baths}</span>
                <span className="flex items-center"><Square className="w-4 h-4 mr-1" /> {property.sqft} sqft</span>
              </div>
              <Button className="w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

