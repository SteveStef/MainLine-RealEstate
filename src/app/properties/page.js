"use client"
import { HouseCard } from '../../components/house-card'
import { SearchAndFilterBar } from '@/components/search-and-filter-bar'

async function getHouses(searchParams) {
  return [
    { id: 1, address: '123 Main St, Houston, TX', price: 350000, bedrooms: 3, bathrooms: 2, sqft: 2000, image: 'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg', yearBuilt: 2010, propertyType: 'Single Family', daysOnMarket: 7 },
    { id: 2, address: '456 Elm St, Houston, TX', price: 450000, bedrooms: 4, bathrooms: 3, sqft: 2500, image: '/placeholder.svg?height=200&width=300', yearBuilt: 2015, propertyType: 'Townhouse', daysOnMarket: 14 },
    { id: 3, address: '789 Oak St, Houston, TX', price: 550000, bedrooms: 5, bathrooms: 4, sqft: 3000, image: '/placeholder.svg?height=200&width=300', yearBuilt: 2020, propertyType: 'Condo', daysOnMarket: 3 },
  ]
}

export default async function HousesPage({searchParams}) {
  const houses = await getHouses(searchParams)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Properties For Sale in the Main Line</h1>
      <SearchAndFilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  )
}
