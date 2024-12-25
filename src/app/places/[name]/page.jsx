
import { CityShowcase } from "./components/showcase"
import { PropertyList } from "./components/propertyList"
import { CityInfo } from "./components/info"
import { RestaurantList } from "./components/nearbyPlaces"
import { ReviewList } from "./components/review"

export default function CityDetailPage({ params }) {
  const cityName = params.cityName

  return (
    <div className="min-h-screen bg-gray-50">
      <CityShowcase cityName={cityName} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Villanova</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyList cityName={cityName} />
            <CityInfo cityName={cityName} />
            <RestaurantList cityName={cityName} />
          </div>
          <div className="lg:col-span-1">
            <ReviewList cityName={cityName} />
          </div>
        </div>
      </div>
    </div>
  )
}

