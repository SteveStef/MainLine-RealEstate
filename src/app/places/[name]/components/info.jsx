
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CityInfo({ cityName }) {
  // In a real application, this would be fetched from an API or database
  const cityInfo = {
    description: `${cityName} is a beautiful city located in the heart of the Main Line. Known for its excellent schools, vibrant community, and rich history, ${cityName} offers a perfect blend of suburban tranquility and urban convenience.`,
    population: 15000,
    medianIncome: 120000,
    medianHomePrice: 650000,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>About {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{cityInfo.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Population:</strong> {cityInfo.population.toLocaleString()}
          </div>
          <div>
            <strong>Median Income:</strong> ${cityInfo.medianIncome.toLocaleString()}
          </div>
          <div>
            <strong>Median Home Price:</strong> ${cityInfo.medianHomePrice.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

