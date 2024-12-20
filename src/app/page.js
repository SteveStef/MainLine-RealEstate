'use client';

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Home, Newspaper, Phone, MapPin, DollarSign, Bed, Bath, ArrowRight, Mail, Clock, Eye, Calendar } from 'lucide-react';
import { motion } from "framer-motion";
import { ImageSlideshow } from "../components/ImageSlideShow";
//import { Map } from "../components/map";
import Background from "../realestate.jpg";
import Image from "next/image";
import YouTube from "react-youtube";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {

    async function getFeatured() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/getProperty?city=Villanova&state=PA`;
        const options = {method:"GET", headers: {"Content-Type": 'application/json'}};
        //const data = await fetch(url, options);
        //console.log(data);
        // data.body is readable streams
      } catch(err) {
        console.log(err);
      }
    }

    getFeatured();
  },[]);

  console.log(featured);

  const mainLineAreas = [
    { name: "Bryn Mawr", image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg" },
    { name: "Ardmore", image: Background  },
    { name: "Wayne", image: "https://photos.zillowstatic.com/fp/c0eed9e47ad141b82966658a00d05a3c-p_e.jpg" },
    { name: "Villanova", image:  "https://photos.zillowstatic.com/fp/6559a8d8fcdb7e815053ed9a17bd267e-p_e.jpg"},
    { name: "Gladwyne", image:  Background},
    { name: "Haverford", image: Background },
  ];

  const insightsAndMedia = [
    {
      type: 'blog',
      title: '10 Tips for First-Time Home Buyers',
      excerpt: 'Navigating the real estate market can be challenging. Here are our top tips for first-time buyers...',
      icon: <Newspaper className="h-5 w-5 mr-2 text-primary" />,
    },
    {
      type: 'video',
      title: 'Exploring Bryn Mawr',
      description: 'Take a tour of the charming town of Bryn Mawr and discover its rich history and vibrant community.',
      videoId: 'kZPwCNdmPEY',
      views: '10,523',
      uploadDate: '2023-05-15',
    },
    {
      type: 'blog',
      title: 'The Benefits of Living on the Main Line',
      excerpt: 'Discover why the Philadelphia Main Line is one of the most sought-after areas for homebuyers...',
      icon: <Newspaper className="h-5 w-5 mr-2 text-primary" />,
    },
    {
      type: 'video',
      title: 'Life in Ardmore',
      description: 'Experience the perfect blend of suburban tranquility and urban convenience in Ardmore.',
      videoId: 'kx0h9A4yoE8',
      views: '8,712',
      uploadDate: '2023-06-22',
    },
    {
      type: 'blog',
      title: 'Investing in Main Line Real Estate',
      excerpt: 'Learn about the potential returns and considerations when investing in Main Line properties...',
      icon: <Newspaper className="h-5 w-5 mr-2 text-primary" />,
    },
    {
      type: 'video',
      title: 'Wayne: A Community Overview',
      description: 'Explore the family-friendly neighborhoods and top-rated schools that make Wayne a desirable place to live.',
      videoId: 'eA1CzzL7Jq0',
      views: '12,105',
      uploadDate: '2023-07-10',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-1">
        <section className="relative w-full">
          <ImageSlideshow />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div 
              className="container px-4 md:px-6 mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                    Welcome to Main Line Realty
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                    Discover your dream home on Philadelphia's prestigious Main Line.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1 bg-white text-gray-900" placeholder="Search properties..." type="text" />
                    <Button type="submit" variant="secondary">
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
<Separator className="bg-gray-200" />
        <section id="properties" className="w-full py-12 md:py-24 lg:py-12 px-4 md:px-6 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Properties
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-primary" />
                        Beautiful Home in Bryn Mawr
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        alt="Property Image"
                        className="w-full h-48 object-cover mb-4 rounded-md"
                        height="200"
                        src={Background}
                        style={{
                          aspectRatio: "300/200",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                      <div className="flex justify-between items-center text-gray-600">
                        <span className="flex items-center"><Bed className="h-4 w-4 mr-1" /> 4 bed</span>
                        <span className="flex items-center"><Bath className="h-4 w-4 mr-1" /> 3 bath</span>
                        <span className="flex items-center"><ArrowRight className="h-4 w-4 mr-1" /> 2,500 sqft</span>
                      </div>
                      <p className="font-bold mt-2 text-2xl flex items-center">
                        <DollarSign className="h-5 w-5 mr-1 text-primary" />750,000
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

    <Separator className="bg-gray-200" />
    <section id="areas" className="w-full py-12 px-4 md:px-6 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Main Line Areas
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mainLineAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Image
                    src={area.image}
                    alt={`${area.name} area`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-xl font-bold mb-2">{area.name}</h3>
                    <Button variant="secondary" size="sm">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
<section id="search" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Perfect Home
            </motion.h2>
            <motion.form 
              className="max-w-xl mx-auto space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Input placeholder="Location (e.g., Bryn Mawr, Ardmore)" type="text" />
              <div className="flex space-x-4">
                <Input placeholder="Min Price" type="number" />
                <Input placeholder="Max Price" type="number" />
              </div>
              <div className="flex space-x-4">
                <Input placeholder="Bedrooms" type="number" />
                <Input placeholder="Bathrooms" type="number" />
              </div>
              <Button className="w-full" type="submit">
                <Search className="h-4 w-4 mr-2" />
                Search Properties
              </Button>
            </motion.form>
          </div>
        </section>

    <Separator className="bg-gray-200" />
<section id="insights" className="w-full py-12 px-4 md:px-6 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Insights & Media
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insightsAndMedia.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {item.type === 'blog' ? item.icon : null}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {item.type === 'blog' ? (
                        <>
                          <p className="text-gray-600">{item.excerpt}</p>
                          <Button className="mt-4" variant="outline">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="aspect-w-16 aspect-h-9 mb-4">
                            <YouTube videoId={item.videoId} opts={{ width: '100%', height: '100%' }} />
                          </div>
                          <CardDescription>{item.description}</CardDescription>
                          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" /> {item.views} views
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" /> {item.uploadDate}
                            </span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

    <Separator className="bg-gray-200" />
        <section id="contact" className="w-full py-12 px-4 md:px-6 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      Get in Touch
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <Input placeholder="Your Name" type="text" />
                      <Input placeholder="Your Email" type="email" />
                      <Input placeholder="Your Phone" type="tel" />
                      <textarea
                        className="w-full h-32 px-3 py-2 text-base text-gray-900 border rounded-lg focus:shadow-outline"
                        placeholder="Your Message"
                      />
                      <Button type="submit">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Our Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">123 Main Line Avenue</p>
                    <p className="text-gray-600">Bryn Mawr, PA 19010</p>
                    <p className="text-gray-600 mt-4 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      (123) 456-7890
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      info@mainlinerealty.com
                    </p>
                    <p className="text-gray-600 mt-4 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      Mon-Fri: 9AM-5PM
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 max-w-7xl mx-auto">
        <p className="text-xs text-gray-600">© 2024 Main Line Realty. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-primary transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-primary transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

