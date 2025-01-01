'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRightCircle, ArrowLeftCircle, Search, Newspaper, Phone, MapPin, DollarSign, Bed, Bath, ArrowRight, Mail, Clock, Eye, Calendar, Home, Users, Award, Info } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import { ImageSlideshow } from "../components/ImageSlideShow";
import Background from "../realestate.jpg";
import Image from "next/image";
import YouTube from "react-youtube";
import {useRef, useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useRouter } from "next/navigation";

function isAddress(input) {
  const addressPattern = /^\d+\s+([A-Za-z0-9.,'’-]+\s)+([A-Za-z]+,\s)?([A-Za-z]+\s)?[A-Z]{2}\s\d{5}$/;
  return addressPattern.test(input.trim());
}

export default function LandingPage() {
  const inputRef = useRef(null);

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

  const mainLineAreas = [
    { name: "Bryn Mawr", image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg" },
    { name: "Ardmore", image: Background  },
    { name: "Wayne", image: "https://photos.zillowstatic.com/fp/c0eed9e47ad141b82966658a00d05a3c-p_e.jpg" },
    { name: "Villanova", image:  "https://photos.zillowstatic.com/fp/6559a8d8fcdb7e815053ed9a17bd267e-p_e.jpg"},
    { name: "Gladwyne", image:  Background},
    { name: "Haverford", image: Background },
    { name: "Overbrook", image: Background },
    { name: "Merion", image: Background },
    { name: "Narberth", image: Background },
    { name: "Wynnewood", image: Background },
    { name: "Rosemont", image: Background },
    { name: "St. Davids", image: Background },
    { name: "Strafford", image: Background },
    { name: "Devon", image: Background },
    { name: "Daylesford", image: Background },
    { name: "Paoli", image: Background },
    { name: "Malvern", image: Background },
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      <main className="flex-1">
        <HeroSection inputRef={inputRef}/>
        <WhyChooseUs />
        <ExploreAreas mainLineAreas={mainLineAreas} />
        <FeaturedProperties />
        <SearchSection />
        <InsightsAndMedia insightsAndMedia={insightsAndMedia} />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection({ inputRef }) {
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    if (inputRef.current) {
      const loc = inputRef.current.value;
      const queryUrl = encodeURIComponent(loc);
      if(isAddress(loc)) {
        router.push(`/properties/${queryUrl}`);
      } else {
        router.push(`/properties?loc=${queryUrl}`);
      }
    }
  }
  return (
    <section className="relative w-full">
      <ImageSlideshow />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div 
          className="container px-4 md:px-6 mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
                Welcome to Main Line Realty
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl lg:text-2xl">
                Discover your dream home on Philadelphia's prestigious Main Line.
              </p>
            </div>
            <motion.div 
              className="w-full max-w-sm space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <form onSubmit={(e) => handleSubmit(e)} className="flex space-x-2">
                <Input ref={inputRef}className="max-w-lg flex-1 bg-white/90 text-gray-900 placeholder-gray-500" placeholder="Search properties..." type="text"/>
                <Button type="submit" variant="secondary" className="bg-primary text-white hover:bg-primary/90">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProperties() {
  return (
    <section id="properties" className="w-full py-12 px-4 md:px-6">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Properties
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="transform transition duration-300 hover:shadow-xl"
            >
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    alt="Property Image"
                    className="w-full h-48 object-cover"
                    height="200"
                    src={Background}
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="flex items-center mb-2 text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Beautiful Home in Bryn Mawr
                  </CardTitle>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span className="flex items-center"><Bed className="h-4 w-4 mr-1" /> 4 bed</span>
                    <span className="flex items-center"><Bath className="h-4 w-4 mr-1" /> 3 bath</span>
                    <span className="flex items-center"><ArrowRight className="h-4 w-4 mr-1" /> 2,500 sqft</span>
                  </div>
                  <p className="font-bold text-xl flex items-center mb-2">
                    <DollarSign className="h-5 w-5 mr-1 text-primary" />750,000
                  </p>
                  <Button className="w-full" variant="outline">View Details</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUs() {
  const reasons = [
    { icon: <Home className="h-10 w-10 text-primary" />, title: "Extensive Property Portfolio", description: "Access to a wide range of properties across the Main Line area." },
    { icon: <Users className="h-10 w-10 text-primary" />, title: "Expert Local Knowledge", description: "Our team has in-depth knowledge of the Main Line real estate market." },
    { icon: <Award className="h-10 w-10 text-primary" />, title: "Award-Winning Service", description: "Recognized for our exceptional customer service and results." },
  ];

  return (
    <section className="w-full py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8">Why Choose Main Line Realty</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 flex justify-center">{reason.icon}</div>
                  <CardTitle className="text-xl font-semibold text-center">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ExploreAreas({ mainLineAreas }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const areasPerPage = 6
  const totalPages = Math.ceil(mainLineAreas.length / areasPerPage)
  
  const currentAreas = mainLineAreas.slice(
    currentPage * areasPerPage,
    (currentPage + 1) * areasPerPage
  )

  const handleNextPage = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <section id="areas" className="w-full py-12 px-4 md:px-6 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Explore Main Line Areas
          </h2>
          <div className="flex space-x-4">
            <Button
              onClick={handlePrevPage}
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeftCircle className="h-6 w-6" />
              <span className="sr-only">View previous areas</span>
            </Button>
            <Button
              onClick={handleNextPage}
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowRightCircle className="h-6 w-6" />
              <span className="sr-only">View next areas</span>
            </Button>
          </div>
        </div>
        
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {currentAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 } 
                  }}
                  className="relative overflow-hidden rounded-lg shadow-md group"
                >
                  <div className="aspect-w-16 aspect-h-12">
                    <Image
                      src={area.image}
                      alt={`${area.name} area`}
                      width={400}
                      height={300}
                      className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <h3 className="text-white text-xl font-bold mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                      {area.name}
                    </h3>
                    <Link href={`places/${area.name}`}>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="mt-6 flex justify-center items-center space-x-2">
          <Button
            onClick={handlePrevPage}
            variant="outline"
            size="sm"
            className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          >
            <ArrowLeftCircle className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === currentPage 
                    ? 'bg-primary w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <Button
            onClick={handleNextPage}
            variant="outline"
            size="sm"
            className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
          >
            Next
            <ArrowRightCircle className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}


function SearchSection() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [squareFootage, setSquareFootage] = useState(1000);
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const query = new URLSearchParams({
      loc: location,
      type: propertyType,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      beds: bedrooms,
      baths: bathrooms,
      sqft: squareFootage,
      status: status,
    }).toString();

    router.push(`/properties?${query}`);
  }

  return (
    <section id="search" className="w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-6 text-primary">
              Find Your Dream Home
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Use our advanced search to discover the perfect property that aligns with your lifestyle and preferences.
            </p>
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <Info className="h-5 w-5 mr-2" />
                  Search Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Use specific locations for more accurate results</li>
                  <li>Adjust price range to fit your budget</li>
                  <li>Consider nearby amenities in your search</li>
                  <li>Don't forget to check our featured properties</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          <motion.form 
            className="lg:col-span-2 space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Input onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Bryn Mawr, Ardmore" type="text" className="w-full" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Property Type</label>
                <Select onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singlefamily">Single Family</SelectItem>
                    <SelectItem value="multifamily">Multi-Family</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="lot/land">Lot/Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price Range</label>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Min"
                    type="number"
                    className="w-1/2"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    className="w-1/2"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bedrooms</label>
                <Select onValueChange={setBedrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}+</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bathrooms</label>
                <Select onValueChange={setBathrooms}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>{num}+</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Square Footage: {squareFootage.toLocaleString()}</label>
              <Slider
                value={[squareFootage]}
                onValueChange={(val) => setSquareFootage(val[0])}
                max={5000}
                step={100}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 sq ft</span>
                <span>5000+ sq ft</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {['For Sale', 'For Rent', 'Recently Sold'].map((st) => (
                    <SelectItem key={st} value={st}>{st}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-primary text-white hover:bg-primary/90 text-lg py-6" type="submit">
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InsightsAndMedia({ insightsAndMedia }) {
  return (
    <section id="insights" className="w-full py-12 px-4 md:px-6 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Insights & Media
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightsAndMedia.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="transform transition duration-300 hover:shadow-lg"
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    {item.type === 'blog' ? item.icon : <Eye className="h-5 w-5 mr-2 text-primary" />}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  {item.type === 'blog' ? (
                    <>
                      <p className="text-gray-600 mb-4">{item.excerpt}</p>
                      <Button className="mt-auto" variant="outline">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <YouTube videoId={item.videoId} opts={{ width: '100%', height: '230' }} />
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
  )
}

function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 px-4 md:px-6 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                    className="w-full h-24 px-3 py-2 text-base text-gray-900 border rounded-lg focus:shadow-outline resize-none"
                    placeholder="Your Message"
                  />
                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
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
                <p className="text-gray-600">Main Line Reality</p>
                <p className="text-gray-600">216 E Lancaster Ave, Wayne, PA 19087</p>
                <p className="text-gray-600 mt-4 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  (610) 947-0408
                </p>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  peterstefanatos@compass.com
                </p>
                <p className="text-gray-600 mt-4 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  Mon-Fri: 9AM-5PM
                </p>
                <div className="mt-4">
<iframe
  width="600"
  height="250"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=216+E+Lancaster+Ave,+Wayne,+PA+19087`}>
</iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
