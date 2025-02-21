"use client";

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Star, MapPin, Train, TreesIcon as Tree, DollarSign, GraduationCap, Search, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import getPlaceInfoByName from "../info.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header.jsx";
import { ResponsiveContainer } from 'recharts';

const MotionCard = motion(Card);

export default function MainLineDetails({params}) {
  const { name } = params;
  const area = getPlaceInfoByName(name);
  const [searchQuery, setSearchQuery] = useState('Restaurants');
  const [searchRadius, setSearchRadius] = useState(2);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { value: 'restaurants', label: 'Restaurants' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'cafe', label: 'Cafe' },
    { value: 'theaters', label: 'Movie Theaters' },
  ];

  useEffect(() => {
    async function getEatingAreas() {
      try {
        const rad = milesToMeters(2);
        let url = `${process.env.NEXT_PUBLIC_API_URL}/getNearbyPlaces?area=${(name.replace("%20","").toLowerCase())}&keyword=${searchQuery}&radius=${parseInt(rad)}`;
        const options = {method: "GET"};
        const response = await fetch(url, options);
        const txt = await response.text();
        const json = await JSON.parse(txt);
        setFilteredItems(json.results);
        setIsDropdownOpen(false);
      } catch(err) {
        console.log(err);
        setIsDropdownOpen(false);
      }
    }
    getEatingAreas();
  },[])

  const renderPricing = (price) => {
    return Array(price).fill('$').join('');
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setIsDropdownOpen(true);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery(category);
    setIsDropdownOpen(false);
  };

  function milesToMeters(miles) {
    if (typeof miles !== "number" || miles < 0) {
      throw new Error("Input must be a non-negative number");
    }
    const metersPerMile = 1609.34;
    return miles * metersPerMile;
  }

  async function getNearbyPlaces() {
    try {
      const rad = milesToMeters(searchRadius);
      let url = `${process.env.NEXT_PUBLIC_API_URL}/getNearbyPlaces?area=${(name.replace("%20","").toLowerCase())}&keyword=${searchQuery}&radius=${parseInt(rad)}`;
      const options = {method: "GET"};
      const response = await fetch(url, options);
      const txt = await response.text();
      const json = await JSON.parse(txt);
      setFilteredItems(json.results);
      setIsDropdownOpen(false);
    } catch(err) {
      console.log(err);
      setIsDropdownOpen(false);
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
          Explore {name.replace("%20"," ")}
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover the unique character, rich history, and exceptional lifestyle of this prestigious Main Line neighborhood.
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
                  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
                      src={image}
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
                  Explore Nearby Places in {name.replace("%20"," ")}
                </h3>
                <div className="relative" ref={dropdownRef}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    getNearbyPlaces();
                  }} className="flex items-center">
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
                  </form>
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
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={staggerChildren}
                initial="initial"
                animate="animate"
              >
                {filteredItems.map((item) => (
                  <RestaurantCard item={item}/>
                ))}
              </motion.div>
            </motion.div>
          </CardContent>
        </MotionCard>
      </div>
    </section>
    </>
  );
}


const fadeInUp= {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren= {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const popIn= {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: 'spring', stiffness: 300, damping: 10 }
};


const renderPricing = (priceLevel) => {
  return Array(priceLevel)
    .fill(0)
    .map((_, index) => (
      <DollarSign key={index} className="h-4 w-4 text-green-500 inline-block" />
    ))
}

function RestaurantCard({ item }) {
  return (
    <motion.div
      variants={popIn}
      initial="hidden"
      animate="visible"
    >
      <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="p-4">
          <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.address}</p>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center bg-green-100 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-green-500 mr-1" />
              <span className="font-bold text-green-700">{item.rating}</span>
            </div>
            <span className="text-sm text-gray-600">{item.user_ratings_total} reviews</span>
          </div>
          {item.price_level ? (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">
                {renderPricing(item.price_level)}
              </span>
            </div> 
          ):<DollarSign className="h-4 w-4 text-green-500 inline-block" />
          }
        </CardContent>
      </Card>
    </motion.div>
  )
}
