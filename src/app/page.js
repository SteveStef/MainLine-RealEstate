'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Phone, ArrowRightCircle, ArrowLeftCircle, Search, Newspaper, DollarSign, Bed, Bath, ArrowRight, Mail, Clock, Eye, Home, Users, Award, Info } from 'lucide-react';
import { useAnimation, AnimatePresence, motion, useInView } from "framer-motion";
import { ImageSlideshow } from "../components/ImageSlideShow";
import Image from "next/image";
import YouTube from "react-youtube";
import { useState, useEffect, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AIChatAssistant from "../components/AiChat";
import Header from "../components/Header.jsx";
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

import Villanova from "../images/villanova.jpeg";
import Brynmar from "../images/MainLineImages/BrynMawr/XbhVxO6z1uEUjdaW.jpg";
import Ardmore from "../images/MainLineImages/ardmore/Suburban-Square-Ardmore-outdoor-scene-R.Kennedy-forVP-2200x1237.jpg";
import Wayne from "../images/MainLineImages/Wayne/eagle-village-shops.jpg";
import Gladwyne from "../images/MainLineImages/gladwyne/1200px-Gladwyne_HD_1_Guard_House.jpg";
import Haverford from "../images/MainLineImages/haverford/PA-02-MO6-001.jpg";
import Merion from "../images/MainLineImages/Merion/Merion_Station_Pennsylvania.jpg";
import Narberth from "../images/MainLineImages/narberth/Narberth_74379712-708f-49b3-9765-493c7e06ed8b.jpg";
import StDavid from "../images/MainLineImages/st davids/eagle-village-shops.jpg";
import Rosemont from "../images/MainLineImages/rosemont/rosemontsquare01.jpg";
import Wynnewood from "../images/MainLineImages/wynnewood/original-d7b6d5731df6ec2b26b6d3bfa58a82d6.png";
import Strafford from "../images/MainLineImages/straford/Strafford_Pennsylvania_Train_Station.jpg";
import Devon from "../images/MainLineImages/Devon/2trp8826jpg_large.jpg";
import Paoli from "../images/MainLineImages/paoli/0016Paoli-scaled.jpg";
import Malvern from "../images/MainLineImages/Malvern/dsc02762.jpg";
import Radnor from "../images/MainLineImages/radnor/150Radnor_Exterior139.jpg";

export default function LandingPage() {

  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    async function getFeatured() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/getFeaturedListings`;
        const options = {method:"GET", headers: {"Content-Type": 'application/json'}};
        const data = await fetch(url, options);
        if(data.ok) {
          const json = await JSON.parse(await data.text());
          setFeatured(json);
        }
      } catch(err) {
        console.log(err);
        setFeatured([]);
      }
    }
    getFeatured();
  },[]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  },[]);

  const mainLineAreas = [
    { name: "Bryn Mawr", image: Brynmar },
    { name: "Radnor", image: Radnor },
    { name: "Ardmore", image: Ardmore },
    { name: "Wayne", image: Wayne },
    { name: "Villanova", image:  Villanova },
    { name: "Gladwyne", image:  Gladwyne },
    { name: "Haverford", image: Haverford },
    { name: "Merion", image: Merion },
    { name: "Narberth", image: Narberth },
    { name: "Wynnewood", image: Wynnewood },
    { name: "Rosemont", image: Rosemont },
    { name: "St. Davids", image: StDavid },
    { name: "Strafford", image: Strafford },
    { name: "Devon", image: Devon },
    { name: "Paoli", image: Paoli },
    { name: "Malvern", image: Malvern },
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
        <Header />
        <HeroSection />
        <WhyChooseUs />
        <ExploreAreas mainLineAreas={mainLineAreas} />
        <FeaturedProperties properties={featured} />
        <SearchSection />
        <InsightsAndMedia insightsAndMedia={insightsAndMedia} />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection() {
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
            </motion.div>
    <AIChatAssistant />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProperties({ properties }) {
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
          {properties.map((property, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="transform transition duration-300 hover:shadow-xl"
            >
              <Card className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    alt="Property Image"
                    className="w-full h-48 object-cover"
                    height="200"
                    src={property?.responsivePhotosOriginalRatio[0]?.mixedSources?.jpeg[0]?.url || ""}
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
                    {property.address.streetAddress}, {property.address.city} {property.address.state}
                  </CardTitle>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <span className="flex items-center"><Bed className="h-4 w-4 mr-1" /> {property.bedrooms} bed</span>
                    <span className="flex items-center"><Bath className="h-4 w-4 mr-1" /> {property.bathrooms} bath</span>
                    <span className="flex items-center"><ArrowRight className="h-4 w-4 mr-1" /> {property.livingArea?.toLocaleString()} sqft</span>
                  </div>
                  <p className="font-bold text-xl flex items-center mb-2">
                    <DollarSign className="h-5 w-5 mr-1 text-primary" />{property.price?.toLocaleString()}
                  </p>
                  <Link href={`properties/${property.streetAddress}`}>
                  <Button className="w-full" variant="outline">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const reasons = [
    {
      icon: <Home className="h-12 w-12 text-primary" />,
      title: "Extensive Property Portfolio",
      description: "Access to a wide range of properties across the Main Line area.",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Expert Local Knowledge",
      description: "Our team has in-depth knowledge of the Main Line real estate market.",
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Award-Winning Service",
      description: "Recognized for our exceptional customer service and results.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Why Choose Main Line Realty</h2>
          <div className="mt-4 mx-auto max-w-2xl">
            <p className="text-muted-foreground">
              We combine local expertise with exceptional service to deliver the best real estate experience.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              className="h-full"
            >
              <Card className="h-full border-none shadow-lg bg-card/50 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />

                <CardHeader className="relative z-10">
                  <div className="mb-5 flex justify-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
                      className="p-4 rounded-full bg-primary/10 text-primary"
                    >
                      {reason.icon}
                    </motion.div>
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground text-center">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export function ExploreAreas({ mainLineAreas }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovering, setIsHovering] = useState(null)
  const areasPerPage = 6
  const totalPages = Math.ceil(mainLineAreas.length / areasPerPage)

  const currentAreas = mainLineAreas.slice(currentPage * areasPerPage, (currentPage + 1) * areasPerPage)

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const handleNextPage = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handlePrevPage = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handlePageClick = (pageIndex) => {
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)
  }

  // Enhanced variants with more sophisticated animations
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const pageTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.4 },
    scale: { type: "spring", stiffness: 400, damping: 30 },
  }

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Background pattern animation
  const patternVariants = {
    initial: {
      backgroundPosition: "0% 0%",
    },
    animate: {
      backgroundPosition: "100% 100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  return (
    <motion.section
      id="areas"
      ref={sectionRef}
      className="w-full py-16 px-4 md:px-6 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, primary 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        variants={patternVariants}
        initial="initial"
        animate="animate"
      />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore Main Line Areas
          </motion.h2>
          <div className="flex space-x-4">
            <Button
              onClick={handlePrevPage}
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-500 hover:scale-110 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md"
            >
              <ArrowLeftCircle className="h-6 w-6" />
              <span className="sr-only">View previous areas</span>
            </Button>
            <Button
              onClick={handleNextPage}
              variant="outline"
              size="icon"
              className="rounded-full transition-all duration-500 hover:scale-110 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md"
            >
              <ArrowRightCircle className="h-6 w-6" />
              <span className="sr-only">View next areas</span>
            </Button>
          </div>
        </motion.div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {currentAreas.map((area, index) => (
                  <motion.div
                    key={area.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: [0.25, 0.1, 0.25, 1.0],
                      },
                    }}
                    whileHover={{ y: -10 }}
                    onHoverStart={() => setIsHovering(index)}
                    onHoverEnd={() => setIsHovering(null)}
                    className="relative overflow-hidden rounded-xl shadow-lg group"
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="w-full h-full"
                      >
                        <Image
                          src={area.image || "/placeholder.svg"}
                          alt={`${area.name} area`}
                          width={400}
                          height={300}
                          className="object-cover w-full h-64 transition-all duration-700"
                        />
                      </motion.div>
                    </div>

                    {/* Gradient overlay with enhanced animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.85 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <motion.h3
                        className="text-white text-2xl font-bold mb-3"
                        initial={{ y: 0 }}
                        whileHover={{ y: -8 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {area.name}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHovering === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Link href={`places/${area.name}`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="font-medium shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
                          >
                            Discover
                          </Button>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Decorative corner accents */}
                    <motion.div
                      className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/30 rounded-tl-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/30 rounded-br-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Enhanced pagination indicators */}
          <div className="flex gap-3 items-center justify-center">
            {[...Array(totalPages)].map((_, i) => (
              <motion.button
                key={i}
                onClick={() => handlePageClick(i)}
                className="relative focus:outline-none"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === currentPage ? "bg-primary shadow-md shadow-primary/30" : "bg-gray-300"
                  }`}
                  initial={{ width: i === currentPage ? 20 : 10 }}
                  animate={{
                    width: i === currentPage ? 20 : 10,
                    backgroundColor: i === currentPage ? "var(--primary)" : "var(--gray-300)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                {i === currentPage && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-4 mt-2">
            <Button
              onClick={handlePrevPage}
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300 hover:translate-x-[-5px] hover:bg-primary hover:text-primary-foreground group"
            >
              <ArrowLeftCircle className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-125" />
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              variant="outline"
              size="sm"
              className="rounded-full transition-all duration-300 hover:translate-x-[5px] hover:bg-primary hover:text-primary-foreground group"
            >
              Next
              <ArrowRightCircle className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:scale-125" />
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
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
    const tmp = {
      location: location,
      price_min: priceRange.min,
      price_max: priceRange.max,
      bed_min: bedrooms,
      baths_min: bathrooms,
      sqft_min: squareFootage,
      status: status,
    };

    if(propertyType === "apartment") tmp.isApartment = true;
    else if(propertyType === "townhouse") tmp.isTownhouse = true;
    else if(propertyType === "lot/land") tmp.isLotLand= true;
    else if(propertyType === "singlefamily") tmp.isSingleFamily = true;
    else if(propertyType === "multifamily") tmp.isMultiFamily = true;
    else if(propertyType === "condo") tmp.isCondo = true;

    const query = new URLSearchParams(tmp).toString();
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
              <label className="text-sm font-medium text-gray-700">Square Footage: {squareFootage.toLocaleString()} (minimum)</label>
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
                  {['forSale', 'forRent', 'recentlySold'].map((st) => (
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    if (!phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(phone.replace(/\D/g,''))) newErrors.phone = "Phone number is invalid"
    if (!message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return
    setLoad(true)
    setStatus(null)
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sendEmail`
      const options = {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({ name, email, phone, message })
      }
      const response = await fetch(url, options)
      if(!response.ok) {
        throw new Error('Failed to send email')
      } else {
        setStatus({ type: 'success', message: "Email was sent successfully!" })
        setEmail("")
        setName("")
        setMessage("")
        setPhone("")
      }
    } catch(err) {
      console.error(err)
      setStatus({ type: 'error', message: "Failed to send email. Please try again." })
    }
    setLoad(false)
  }

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Your Name" 
                      type="text"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Your Email" 
                      type="email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Input 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Your Phone" 
                      type="tel"
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full h-24 px-3 py-2 text-base text-gray-900 border rounded-lg focus:shadow-outline resize-none ${errors.message ? "border-red-500" : ""}`}
                      placeholder="Your Message"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  <Button disabled={load} type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                    <Mail className="h-4 w-4 mr-2" />
                    {load ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
                {status && (
                  <Alert className={`mt-4 ${status.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                )}
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
                <p className="text-gray-600">Main Line Realty</p>
                <p className="text-gray-600">216 E Lancaster Ave, Wayne, PA 19087</p>
                <p className="text-gray-600 mt-4 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  (610) 781-7003
                </p>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  peter.stefanatos@compass.com
                </p>
                <p className="text-gray-600 mt-4 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  Mon-Fri: 9AM-5PM
                </p>
                <div className="mt-4">
                  <iframe
                    width="100%"
                    height="250"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
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
