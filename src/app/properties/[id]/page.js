'use client'

import { useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BedIcon, BathIcon, SquareIcon, Home, DollarSignIcon, CalendarIcon, TreePineIcon, CarIcon, HeartIcon, Share2Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from "next/link"

// In a real application, this would fetch data from an API or database
function getHouseDetails(id) {
  const houses = [
    { 
      id: '1', 
      address: '123 Main St, Houston, TX 77001', 
      price: 350000, 
      bedrooms: 3, 
      bathrooms: 2, 
      sqft: 2000, 
      yearBuilt: 2010,
      propertyType: 'Single Family',
      lotSize: 5000,
      garage: 2,
      description: 'Beautiful single-family home in a quiet neighborhood. Recently renovated with modern appliances and finishes. Large backyard perfect for entertaining.',
      features: ['Central Air', 'Hardwood Floors', 'Fireplace', 'Fenced Yard', 'Stainless Steel Appliances'],
      images: [
        'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg',
        'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg',
        'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg',
        'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg',
        'https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg',
      ]
    },
    // Add more house objects as needed
  ]

  const house = houses.find(h => h.id === id)
  if (!house) notFound()
  return house
}

export default function HouseDetailsPage({ params }) {
  const house = getHouseDetails(params.id)
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [collageStartIndex, setCollageStartIndex] = useState(1)

  const nextMainImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % house.images.length)
  }

  const prevMainImage = () => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + house.images.length) % house.images.length)
  }

  const nextCollageImages = () => {
    setCollageStartIndex((prevIndex) => Math.min(prevIndex + 4, house.images.length - 4))
  }

  const prevCollageImages = () => {
    setCollageStartIndex((prevIndex) => Math.max(prevIndex - 4, 1))
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >

      <motion.header 
        className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link className="flex items-center justify-center" href="#">
          <Home className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Main Line Realty</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#properties">
            Properties
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#search">
            Search
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#blog">
            Blog
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
      </motion.header>
      <br></br>
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        {house.address}
      </motion.h1>
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-[400px] md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={mainImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              <Image
                src={house.images[mainImageIndex]}
                alt={`${house.address} - Main Image`}
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevMainImage}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextMainImage}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {house.images.slice(collageStartIndex, collageStartIndex + 4).map((image, index) => (
              <motion.div
                key={index + collageStartIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="relative h-[190px] md:h-[290px]"
              >
                <Image
                  src={image}
                  alt={`${house.address} - Interior ${index + collageStartIndex}`}
                  fill
                  className="rounded-lg object-cover"
                />
              </motion.div>
            ))}
          </div>
          {collageStartIndex > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
              onClick={prevCollageImages}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          )}
          {collageStartIndex + 4 < house.images.length && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={nextCollageImages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <DollarSignIcon className="mr-2" />
              ${house.price.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{house.propertyType}</Badge>
              <Badge variant="outline">
                <CalendarIcon className="mr-1 h-4 w-4" />
                Built in {house.yearBuilt}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <BedIcon className="mr-2" />
                <span>{house.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <BathIcon className="mr-2" />
                <span>{house.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <SquareIcon className="mr-2" />
                <span>{house.sqft.toLocaleString()} sqft</span>
              </div>
              <div className="flex items-center">
                <TreePineIcon className="mr-2" />
                <span>{house.lotSize.toLocaleString()} sqft lot</span>
              </div>
              <div className="flex items-center">
                <CarIcon className="mr-2" />
                <span>{house.garage} Car Garage</span>
              </div>
            </div>
            <Separator className="my-4" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="mb-4">{house.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside mb-4">
                {house.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-2 border rounded"
              ></textarea>
              <Button className="w-full">Send Message</Button>
            </form>
            <div className="flex justify-between mt-6">
              <Button variant="outline">
                <HeartIcon className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline">
                <Share2Icon className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
