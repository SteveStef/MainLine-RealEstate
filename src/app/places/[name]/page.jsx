"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Star,
  MapPin,
  Train,
  TreesIcon as Tree,
  DollarSign,
  GraduationCap,
  Search,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import getPlaceInfoByName from "../info.js"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/Header.jsx"

const MotionCard = motion(Card)

export default function MainLineDetails({ params }) {
  const { name } = params
  const area = getPlaceInfoByName(name)
  const [searchQuery, setSearchQuery] = useState("Restaurants")
  const [searchRadius, setSearchRadius] = useState(2)
  const [filteredItems, setFilteredItems] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const categories = [
    { value: "restaurants", label: "Restaurants" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "parks", label: "Parks & Recreation" },
    { value: "cafe", label: "Cafe" },
    { value: "theaters", label: "Movie Theaters" },
  ]

  useEffect(() => {
    async function getEatingAreas() {
      try {
        const rad = milesToMeters(2)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/getNearbyPlaces?area=${name.replace("%20", "").toLowerCase()}&keyword=${searchQuery}&radius=${Number.parseInt(rad)}`
        const options = { method: "GET" }
        const response = await fetch(url, options)
        const txt = await response.text()
        const json = await JSON.parse(txt)
        console.log(json)
        setFilteredItems(json.results)
        setIsDropdownOpen(false)
      } catch (err) {
        console.log(err)
        setIsDropdownOpen(false)
      }
    }
    getEatingAreas()
  }, [])

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setIsDropdownOpen(true)
  }

  const handleCategorySelect = (category) => {
    setSearchQuery(category)
    setIsDropdownOpen(false)
  }

  function milesToMeters(miles) {
    if (typeof miles !== "number" || miles < 0) {
      throw new Error("Input must be a non-negative number")
    }
    const metersPerMile = 1609.34
    return miles * metersPerMile
  }

  async function getNearbyPlaces() {
    try {
      const rad = milesToMeters(searchRadius)
      const url = `${process.env.NEXT_PUBLIC_API_URL}/getNearbyPlaces?area=${name.replace("%20", "").toLowerCase()}&keyword=${searchQuery}&radius=${Number.parseInt(rad)}`
      const options = { method: "GET" }
      const response = await fetch(url, options)
      const txt = await response.text()
      const json = await JSON.parse(txt)
      setFilteredItems(json.results)
      setIsDropdownOpen(false)
    } catch (err) {
      console.log(err)
      setIsDropdownOpen(false)
    }
  }

  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <section className="w-full py-12 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore {name.replace("%20", " ")}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover the unique character, rich history, and exceptional lifestyle of this prestigious Main Line
            neighborhood.
          </motion.p>
          <MotionCard
            className="mb-12 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-3xl font-bold">{area.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div {...fadeInUp}>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 text-primary" />
                    About {area.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{area.description}</p>
                  <Separator className="my-6" />
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <Home className="mr-2 text-primary" />
                    History
                  </h3>
                  <p className="text-gray-600 mb-4">{area.history}</p>
                </motion.div>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
                  }}
                  initial="initial"
                  animate="animate"
                >
                  {area.images.map((image, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${area.name} ${index + 1}`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48 transition-transform duration-300 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div {...fadeInUp}>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 text-primary" />
                    Points of Interest
                  </h3>
                  <ul className="space-y-2">
                    {area.nearbyPlaces.map((place, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        {place}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold mt-6 mb-4 flex items-center">
                    <Train className="mr-2 text-primary" />
                    Transportation
                  </h3>
                  <ul className="space-y-2">
                    {area.transportation.map((item) => (
                      <li key={item} className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-2xl font-semibold mt-6 mb-4 flex items-center">
                    <Tree className="mr-2 text-primary" />
                    Recreation
                  </h3>
                  <ul className="space-y-2">
                    {area.recreation.map((item) => (
                      <li key={item} className="text-gray-600 flex items-center">
                        <Tree className="h-4 w-4 mr-2 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <div>
                  <motion.div {...fadeInUp}>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                      <DollarSign className="mr-2 text-primary" />
                      Economic Overview
                    </h3>
                    <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Median Income:</span>
                            <span className="text-primary">{area.economicInfo.medianIncome}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Median Home Price:</span>
                            <span className="text-primary">{area.economicInfo.medianHomePrice}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Population:</span>
                            <span className="text-primary">100,000</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Unemployment Rate:</span>
                            <span className="text-primary">{area.economicInfo.unemploymentRate}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div {...fadeInUp}>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center">
                      <GraduationCap className="mr-2 text-primary" />
                      Education
                    </h3>
                    <div className="space-y-4 mb-6">
                      {area.schools.map((school) => (
                        <Card key={school.name} className="hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{school.name}</h4>
                                <p className="text-sm text-gray-600">{school.type}</p>
                              </div>
                              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="font-bold text-yellow-700">{school.rating}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              <Separator className="my-8" />

              <motion.div {...fadeInUp}>
                <div className="flex flex-col space-y-4 mb-6">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <Search className="mr-2 text-primary" />
                    Explore Nearby Places in {name.replace("%20", " ")}
                  </h3>
                  <div className="relative" ref={dropdownRef}>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1" ref={dropdownRef}>
                          <Input
                            placeholder="Search places..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pr-10"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                              >
                                {categories.map((category) => (
                                  <button
                                    key={category.value}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => handleCategorySelect(category.value)}
                                  >
                                    {category.label}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <Button
                          type="submit"
                          onClick={getNearbyPlaces}
                          className="bg-primary hover:bg-primary/90 text-white"
                        >
                          Search
                        </Button>
                      </div>
                      <div>
                        <Label htmlFor="radius-slider">Search Radius: {searchRadius} miles</Label>
                        <Slider
                          id="radius-slider"
                          min={1}
                          max={20}
                          step={1}
                          value={[searchRadius]}
                          onValueChange={(value) => setSearchRadius(value[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  {filteredItems.map((item, idx) => (
                    <div key={idx}>
                      <RestaurantCard item={item} />
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </CardContent>
          </MotionCard>
        </div>
      </section>
    </>
  )
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const popIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      duration: 0.4,
    },
  },
}

const renderPricing = (priceLevel) => {
  return (
    <div className="flex">
      {Array(priceLevel)
        .fill(0)
        .map((_, index) => (
          <DollarSign key={index} className="h-4 w-4 text-primary inline-block fill-primary/10" />
        ))}
      {Array(4 - (priceLevel || 0))
        .fill(0)
        .map((_, index) => (
          <DollarSign key={index + (priceLevel || 0)} className="h-4 w-4 text-gray-300 inline-block" />
        ))}
    </div>
  )
}

function RestaurantCard({ item }) {
  // Generate a consistent background gradient based on the first letter of the restaurant name
  const getGradientColors = (name) => {
    const firstChar = (name || "A").charAt(0).toLowerCase()
    const charCode = firstChar.charCodeAt(0)
    const hue1 = (charCode * 15) % 360
    const hue2 = (hue1 + 40) % 360
    return `from-[hsl(${hue1},85%,92%)] to-[hsl(${hue2},90%,95%)]`
  }

  // Get first letter for the avatar
  const firstLetter = (item.name || "").charAt(0).toUpperCase()

  // Get category icon (simplified version)
  const getCategoryIcon = () => {
    const types = item.types || []
    if (types.includes("restaurant") || types.includes("food")) return "🍽️"
    if (types.includes("cafe")) return "☕"
    if (types.includes("bar")) return "🍸"
    if (types.includes("store") || types.includes("shop")) return "🛍️"
    if (types.includes("park")) return "🌳"
    if (types.includes("museum")) return "🏛️"
    if (types.includes("movie_theater")) return "🎬"
    return "📍"
  }

  return (
    <motion.div variants={popIn} className="h-full">
      <Card
        className="overflow-hidden h-full border hover:border-primary transition-all duration-300 group"
        onClick={() => console.log(`Viewing details for ${item.name}`)}
      >
        <div
          className={`flex items-center p-4 bg-gradient-to-r ${getGradientColors(item.name)} group-hover:saturate-150 transition-all duration-300`}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-primary shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
            {firstLetter}
          </div>
          <div className="ml-3 flex-1">
            <h4 className="font-semibold text-lg line-clamp-1 text-gray-800 group-hover:text-primary transition-colors duration-300">
              {item.name}
            </h4>
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">{getCategoryIcon()}</span>
              <span className="line-clamp-1">{item.vicinity || item.address || "Local establishment"}</span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
            <ChevronDown className="h-4 w-4 text-primary transform group-hover:rotate-180 transition-transform duration-300" />
          </div>
        </div>
        <CardContent className="p-4 bg-white relative overflow-hidden">
          {/* Animated highlight effect on hover */}
          <div className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></div>

          <div className="flex items-center justify-between mb-3 relative">
            <div className="flex items-center">
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100 group-hover:bg-yellow-100 transition-colors duration-300">
                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-400" />
                <span className="font-bold text-yellow-700">{item.rating || "N/A"}</span>
              </div>
              <span className="text-xs text-gray-500 ml-2">{item.user_ratings_total || 0} reviews</span>
            </div>
            {item.open_now !== undefined && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${item.open_now ? "bg-green-50 text-green-700 border border-green-100 group-hover:bg-green-100" : "bg-red-50 text-red-700 border border-red-100 group-hover:bg-red-100"} transition-colors duration-300`}
              >
                {item.open_now ? "Open Now" : "Closed"}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 relative">
            <span className="text-sm font-medium text-gray-500">
              {item.price_level ? (
                renderPricing(item.price_level)
              ) : (
                <DollarSign className="h-4 w-4 text-green-500 inline-block" />
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

