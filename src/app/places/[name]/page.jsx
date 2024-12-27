import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Utensils, Home, Star, GraduationCap, Train, TreesIcon as Tree, Building, DollarSign, User } from 'lucide-react';

const areaDetails = [
  {
    name: "Bryn Mawr",
    description: "Bryn Mawr is an affluent community located on Philadelphia's historic Main Line. Known for its prestigious institutions, beautiful architecture, and vibrant community life, Bryn Mawr offers a perfect blend of suburban tranquility and urban convenience.",
    history: "Established in 1869, Bryn Mawr has a rich history deeply intertwined with the development of the Pennsylvania Railroad. The name 'Bryn Mawr' means 'big hill' in Welsh and was named by Rowland Ellis, a Welsh Quaker who originally owned the land.",
    images: [
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
    ],
    nearbyPlaces: ["Bryn Mawr College", "Harriton House", "Bryn Mawr Film Institute", "Bryn Mawr Hospital"],
    properties: [
      { name: "Elegant Victorian", price: "$1,200,000", bedrooms: 5, bathrooms: 4, sqft: 4200, image: "https://photos.zillowstatic.com/fp/7f0ddfd3619b1d9d8d1c3c04b57a4b9c-cc_ft_1536.webp" },
      { name: "Modern Townhouse", price: "$750,000", bedrooms: 3, bathrooms: 2.5, sqft: 2100, image: "https://photos.zillowstatic.com/fp/b87f0c9b9a7b7f9b9f9b9f9b9f9b9f9b-cc_ft_1536.webp" },
      { name: "Charming Colonial", price: "$950,000", bedrooms: 4, bathrooms: 3, sqft: 3000, image: "https://photos.zillowstatic.com/fp/c9f0c9b9a7b7f9b9f9b9f9b9f9b9f9b-cc_ft_1536.webp" },
    ],
    restaurants: [
      {
        name: "Tango",
        cuisine: "American",
        rating: 4.5,
        priceRange: "$$",
      image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
        reviews: [
          { author: "John D.", content: "Great atmosphere and delicious food. The steak was cooked to perfection!", rating: 5 },
          { author: "Sarah M.", content: "Lovely place for a date night. The wine selection is impressive.", rating: 4 },
        ]
      },
      {
        name: "Ekta Indian Cuisine",
        cuisine: "Indian",
        rating: 4.7,
        priceRange: "$$",
      image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
        reviews: [
          { author: "Raj P.", content: "Authentic Indian flavors. The butter chicken is a must-try!", rating: 5 },
          { author: "Emily L.", content: "Extensive menu with great vegetarian options. Friendly staff too.", rating: 4.5 },
        ]
      },
      {
        name: "Fraschetta",
        cuisine: "Italian",
        rating: 4.6,
        priceRange: "$$$",
      image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
        reviews: [
          { author: "Marco R.", content: "Feels like dining in Italy. The homemade pasta is exceptional.", rating: 5 },
          { author: "Lisa K.", content: "Cozy ambiance and attentive service. The tiramisu is to die for!", rating: 4.5 },
        ]
      },
    ],
    schools: [
      { name: "The Baldwin School", type: "Private", rating: 4.8 },
      { name: "The Shipley School", type: "Private", rating: 4.7 },
      { name: "Radnor High School", type: "Public", rating: 4.5 },
    ],
    transportation: [
      "SEPTA Regional Rail - Paoli/Thorndale Line",
      "SEPTA Bus Routes 105 and 106",
      "Easy access to I-476 (Blue Route)",
    ],
    recreation: [
      "Ashbridge Memorial Park",
      "Bryn Mawr Community Center",
      "Harriton House and Park",
    ],
    economicInfo: {
      medianIncome: "$110,000",
      medianHomePrice: "$625,000",
      unemploymentRate: "2.8%",
    },
  },
  // Add more areas here...
];

export default function MainLineDetails() {
  return (
    <section className="w-full py-12 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">
          Explore Main Line Areas in Detail
        </h2>
       <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Explore the unique character, rich history, and exceptional lifestyle of Philadelphia's prestigious Main Line neighborhoods.
        </p>
        {areaDetails.map((area) => (
          <Card key={area.name} className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{area.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">About {area.name}</h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <Separator className="my-6" />
                  <h3 className="text-2xl font-semibold mb-4">History</h3>
                  <p className="text-gray-600 mb-4">{area.history}</p>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {area.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${area.name} ${index + 1}`}
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full h-48"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Points of Interest</h3>
                  <ul className="list-disc list-inside mb-6">
                    {area.nearbyPlaces.map((place) => (
                      <li key={place} className="text-gray-600 mb-2">{place}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold mb-4">Transportation</h3>
                  <ul className="list-disc list-inside mb-6">
                    {area.transportation.map((item) => (
                      <li key={item} className="text-gray-600 mb-2">{item}</li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold mb-4">Recreation</h3>
                  <ul className="list-disc list-inside mb-6">
                    {area.recreation.map((item) => (
                      <li key={item} className="text-gray-600 mb-2">{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Economic Overview</h3>
                  <Card className="mb-6">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Median Income:</span>
                        <span className="text-primary">{area.economicInfo.medianIncome}</span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Median Home Price:</span>
                        <span className="text-primary">{area.economicInfo.medianHomePrice}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Population</span>
                        <span className="text-primary">100000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Unemployment Rate:</span>
                        <span className="text-primary">{area.economicInfo.unemploymentRate}</span>
                      </div>

                    </CardContent>
                  </Card>

                  <h3 className="text-2xl font-semibold mb-4">Education</h3>
                  <div className="space-y-4 mb-6">
                    {area.schools.map((school) => (
                      <Card key={school.name}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{school.name}</h4>
                              <p className="text-sm text-gray-600">{school.type}</p>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{school.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <h3 className="text-2xl font-semibold mb-4">Featured Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {area.properties.map((property) => (
                  <Card key={property.name}>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <Image
                          src={property.image}
                          alt={property.name}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{property.name}</h4>
                      <p className="text-primary font-bold text-xl mb-2">{property.price}</p>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="flex items-center"><Home className="h-4 w-4 mr-1" /> {property.bedrooms} bed</span>
                        <span className="flex items-center"><Home className="h-4 w-4 mr-1" /> {property.bathrooms} bath</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{property.sqft} sqft</p>
                      <Button className="w-full" variant="outline">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-2xl font-semibold mb-4">Popular Restaurants</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {area.restaurants.map((restaurant) => (
                  <Card key={restaurant.name}>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          width={400}
                          height={300}
                          className="rounded-lg object-cover w-full h-48"
                        />
                      </div>
                      <h4 className="font-semibold text-lg mb-1">{restaurant.name}</h4>
                      <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                      <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{restaurant.rating}</span>
                        <span className="ml-2 text-gray-600">{restaurant.priceRange}</span>
                      </div>
                      <Separator className="my-4" />
                      <h5 className="font-semibold mb-2">Recent Reviews</h5>
                      {restaurant.reviews.map((review, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex items-center mb-1">
                            <User className="h-4 w-4 mr-2" />
                            <span className="font-semibold">{review.author}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{review.content}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            <span>{review.rating}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

