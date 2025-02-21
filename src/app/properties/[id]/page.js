'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X,
  DollarSign, Circle, HomeIcon, User, Mail, Phone, Send, Bed, Bath, Ruler, Calendar, Home, TreesIcon as Tree, Car, MapPin, Calculator, Warehouse, Thermometer, Wind, Droplet, Zap, Trees, Building, School, ParkingCircle, Key, HardHat, Hammer, Lightbulb, Footprints,Leaf,Mountain, Eye,Wifi,Trash2, Fence,Info } from 'lucide-react';
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ScrollArea } from "@/components/ui/scroll-area"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/Header.jsx";

function sortAndSlice(list) {
  if(!list) return [];
  const sorted = list.sort((a,b) => a.time - b.time);
  const res = [];
  if(list.length < 5) {
    return list;
  } else {
    for(let i = list.length - 5; i < list.length; i++) {
      res.push(sorted[i]);
    }
    return res;
  }
}

export default function HouseDetails(props) {
  const { id } = props.params;
  let address = `${decodeURIComponent(id)}`;

  const [isValid, setIsValid] = useState(true);
  const [houseData, setHouseData] = useState(null);

  useEffect(() => {
    async function getAddressInformation() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/getPropertyByAddress?address=${address}`;
        const options = { method: "GET" };
        const data = await fetch(url, options);
        if(!data.ok || data.error) {
          setIsValid(false);
          return;
        }
        const text = await data.text(); 
        const jsonRes = await JSON.parse(text);
        setHouseData(jsonRes);
      } catch(err) {
        console.log(err);
        setIsValid(false);
      }
    }
    getAddressInformation();
  },[]);

  if(!isValid) return <NoPropertyFound address={address}/>

  return (
    <>
    <Header />
    <br></br>
    <br></br>
    <br></br>
      {houseData ? (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">{address}</h1>
          {
            houseData.photos?.length > 0 &&
          <ImageCollage images={houseData.photos} />
          }
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <PropertyInfo data={houseData} />
              <NearbyAmenities
                amenities={houseData?.homeInsights?.[0]?.insights?.[0]?.phrases || []}
                schools={houseData.schools || []}
                stats={houseData}
              />

              <PropertyDetails propertyInfo={houseData.resoFacts || {}}/>
            </div>
            <div>
              <ContactForm />
              <TaxHistory history={sortAndSlice(houseData.taxHistory) || []} />
              <PriceHistory history={sortAndSlice(houseData.priceHistory) || []} />
              <NearbyHomes homes={houseData.nearbyHomes || []} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}


function ImageCollage({ images }) {
  const [showAll, setShowAll] = useState(false)
  const len = images[0].mixedSources.jpeg.length - 1

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="w-full sm:w-1/2">
          <Image 
            src={images[0].mixedSources.jpeg[len].url} 
            alt="Main property image" 
            width={800} 
            height={600} 
            className="w-full h-[200px] sm:h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="w-full sm:w-1/2 grid grid-cols-2 gap-2 mt-2 sm:mt-0">
          {images.slice(1, 5).map((img, index) => (
            <Image 
              key={index} 
              src={img.mixedSources.jpeg[len].url} 
              alt={`Property image ${index + 2}`} 
              width={400} 
              height={300} 
              className="w-full h-[100px] sm:h-[196px] object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
      {!showAll && (
        <button 
          onClick={() => setShowAll(true)}
          className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-sm sm:text-base"
        >
          View More
        </button>
      )}
      {showAll && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-auto p-4">
          <button 
            onClick={() => setShowAll(false)}
            className="absolute top-4 right-4 text-white p-2"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {images.map((img, index) => (
              <Image 
                key={index} 
                src={img.mixedSources.jpeg[len].url} 
                alt={`Property image ${index + 1}`} 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PropertyInfo({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 100; // Set the word limit for the description preview

  // Helper function to get the truncated description
  const getTruncatedDescription = () => {
    const words = data.description?.split(' ');
    if(!words) return "";
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : data.description;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
<h2 className="text-3xl font-bold mb-4 text-black font-sans relative">
  ${data.price.toLocaleString()}<span className="text-2xl">{data.homeStatus === "FOR_RENT" && "/MO"}</span>
  <span
    className="absolute ml-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full"
  >
    {data.homeStatus.replace("_", " ")} 
  </span>
</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <InfoItem
          icon={<Bed className="text-blue-500" />}
          value={data.bedrooms}
          label="Bedrooms"
        />
        <InfoItem
          icon={<Bath className="text-green-500" />}
          value={data.bathrooms}
          label="Bathrooms"
        />
        <InfoItem
          icon={<Ruler className="text-yellow-500" />}
          value={`${(data.livingArea || "").toLocaleString() }`}
          label={`${data.livingAreaUnits}`}
        />
        <InfoItem
          icon={<Calendar className="text-red-500" />}
          value={data.yearBuilt || "N/A"}
          label="Year Built"
        />
        <InfoItem
          icon={<Home className="text-purple-500" />}
          value={data.propertyTypeDimension}
          label="Property Type"
        />
        <InfoItem
          icon={<Tree className="text-green-700" />}
          value={`${data.lotAreaValue?.toFixed(2) || "N/A"} ${data.lotAreaUnits}`}
          label="Lot Area"
        />
        <InfoItem
          icon={<Car className="text-gray-600" />}
          value={data.garage || "N/A"}
          label="Garage Spaces"
        />
        <InfoItem
          icon={<MapPin className="text-red-600" />}
          value={data.zipcode}
          label="Zip Code"
        />
      </div>
      <p className="mb-6 text-gray-700 leading-relaxed">
        {isExpanded ? data.description : getTruncatedDescription()}
      </p>
      {data.description?.split(' ').length > wordLimit && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 font-semibold underline"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
      )}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="font-semibold text-gray-700">Date Posted</p>
          <p className="text-black">
            {data.datePostedString || "Information not available"}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">Previously Sold</p>
          <p className="text-black">
            {data.dateSoldString?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, value, label }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-black text-xl">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  )
}

function Features({ features }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black font-sans">Features</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}


function NearbyAmenities({ amenities, schools, stats }) {

  const encodedAddress = encodeURIComponent(stats.address.streetAddress); // Encode the address for the URL
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black font-sans">Location on Map</h2>
    <iframe
      width="100%"
      height="250"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&q=${encodedAddress}`}
      title="Google Map"
    ></iframe>
    <br></br>
      
      <Table className="mb-6">
        <TableHeader>
          <TableRow>
            <TableHead>Statistic</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-gray-700">Fifteen Year Interest Rate</TableCell>
            <TableCell>{(stats.mortgageRates?.fifteenYearFixedRate)?.toFixed(2)}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-gray-700">Thirty Year Interest Rate</TableCell>
            <TableCell>{stats.mortgageRates?.thirtyYearFixedRate?.toFixed(2)}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-gray-700">Property Tax Rate</TableCell>
            <TableCell>{stats.propertyTaxRate?.toFixed(2)}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-gray-700">HOA Monthly Fee</TableCell>
            <TableCell>{stats.monthlyHoaFee?"$":""}{stats.monthlyHoaFee?.toLocaleString() || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2 text-gray-700 font-sans">Amenities</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {amenities.map((amenity, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Circle className="text-blue-500 w-4 h-4" />
              <span className="text-gray-700">{amenity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-gray-700 font-sans">Nearby Schools</h3>
        <ul className="space-y-4">
          {schools.map((school, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div>
                <Link href={school.link} className="font-medium text-gray-800">{school.name}</Link>
                <p className="text-sm text-gray-600">{school.type} • {school.distance} miles</p>
              </div>
              <div className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                Rating: {school.rating}/10
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PriceHistory({ history }) {
  const chartData = history.map(h => ({
    date: new Date(h.time).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    price: h.price,
    priceChangeRate: (h.priceChangeRate * 100).toFixed(2), // Convert to percentage
    pricePerSquareFoot: h.pricePerSquareFoot,
  }));

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Price History</CardTitle>
        <CardDescription>Price changes and trends over time</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-gray-700">No price history available.</p>
        ) : (
          <>
            <ChartContainer
              config={{
                price: {
                  label: "Price",
                  color: "hsl(var(--chart-1))",
                },
                pricePerSquareFoot: {
                  label: "Price per SqFt",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    interval={0} 
                    tick={{fontSize: 12}}
                  />
                  <YAxis yAxisId="left" tickFormatter={value => `$${value.toLocaleString()}`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={value => `${value}%`} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="price" 
                    stroke="var(--color-price)" 
                    name="Price" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="priceChangeRate" 
                    stroke="var(--color-priceChangeRate)" 
                    name="Price Change Rate (%)" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function TaxHistory({ history }) {
  const chartData = history.map(h => ({
    date: new Date(h.time).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    taxPaid: h.taxPaid,
    value: h.value,
  }))

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle>Tax History</CardTitle>
        <CardDescription>Tax paid and property value over time</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <p className="text-gray-700">No tax history available.</p>
        ) : (
          <>
            <ChartContainer
              config={{
                taxPaid: {
                  label: "Tax Paid",
                  color: "hsl(var(--chart-1))",
                },
                value: {
                  label: "Property Value",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    interval={0} 
                    tick={{fontSize: 12}}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="taxPaid" stroke="var(--color-taxPaid)" name="Tax Paid" />
                  <Line yAxisId="right" type="monotone" dataKey="value" stroke="var(--color-value)" name="Property Value" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

          </>
        )}
      </CardContent>
    </Card>
  );
}

function NearbyHomes({ homes }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black font-sans">Nearby Homes</h2>
      {homes.length === 0 ? (
        <p className="text-gray-700">No nearby homes available.</p>
      ) : (
        <ul className="space-y-4">
          {homes.slice(0,3).map((home, index) => (
            <li key={index} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
              {home.miniCardPhotos && home.miniCardPhotos.length > 0 && (
                <Image
                  src={home.miniCardPhotos[0].url || ""}
                  alt={`Nearby home`}
                  width={100}
                  height={75}
                  className="rounded-md object-cover"
                />
              )}
              <div>
                <p className="font-medium text-gray-800">{home.address.streetAddress}</p>
                <p className="text-sm text-gray-600">{(home.livingArea || "").toLocaleString()} {home.livingAreaUnits}</p>
                <p className="text-sm font-semibold text-black">${(home.price || "").toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


function MonthlyCostCalculator({ price, taxRate }) {
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(30)

  const calculateMonthlyCost = () => {
    const principal = price * (1 - downPayment / 100)
    const monthlyInterest = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyMortgage = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1)
    const monthlyTax = (price * (taxRate / 100)) / 12
    const monthlyInsurance = (price * 0.0035) / 12 // Assuming annual insurance is 0.35% of home value

    return {
      mortgage: monthlyMortgage,
      tax: monthlyTax,
      insurance: monthlyInsurance,
      total: monthlyMortgage + monthlyTax + monthlyInsurance
    }
  }

  const monthlyCost = calculateMonthlyCost()

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black flex items-center font-sans">
        <Calculator className="mr-2 text-blue-500" />
        Monthly Cost Calculator
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 font-sans">Estimated Monthly Costs</h3>
        <div className="grid grid-cols-2 gap-2">
          <p>Mortgage:</p>
          <p className="text-right">${monthlyCost.mortgage.toFixed(2)}</p>
          <p>Property Tax:</p>
          <p className="text-right">${monthlyCost.tax.toFixed(2)}</p>
          <p>Insurance:</p>
          <p className="text-right">${monthlyCost.insurance.toFixed(2)}</p>
          <p className="font-semibold">Total:</p>
          <p className="text-right font-semibold">${monthlyCost.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}


function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [load, setLoad] = useState(false)
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})

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
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-black flex items-center font-sans">
        <User className="mr-2 text-blue-500" />
        Contact an Agent
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <Textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={load}
          className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
        >
          <Send className="mr-2" size={18} />
          {load ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
      {status && (
        <Alert className={`mt-4 ${status.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

function NoPropertyFound({ address }) {
  return (
    <div className="flex flex-col items-center justify-center h-[75vh] bg-white rounded-lg shadow-md p-8">
      <HomeIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">No Property Found</h2>
      <p className="text-gray-500 text-center">
        There are no properties under the address: {address}
      </p>
      <p className="text-gray-700 font-semibold mt-2 text-center">{address}</p>
    </div>
  )
}

const formatKey = (key) => {
  return key.split(/(?=[A-Z])/).join(' ').replace(/\b\w/g, c => c.toUpperCase())
}

const formatValue = (value) => {
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === 'object' && 'factLabel' in value[0]) {
      return (
        <ul className="list-disc pl-5">
          {(value).map((fact, index) => (
            <li key={index}>
              <span className="font-semibold">{fact.factLabel}:</span> {fact.factValue}
            </li>
          ))}
        </ul>
      )
    }
    return value.join(', ')
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  return value.toString()
}

const PropertyDetails = ({ propertyInfo }) => {
  const filteredInfo = Object.entries(propertyInfo).filter(([_, value]) => value !== null)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Property</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInfo.map(([key, value]) => {
                const Icon = iconMap[key] || Home
                return (
                  <TableRow key={key}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5" />
                        <span>{formatKey(key)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatValue(value)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

const iconMap = {
  homeType: Home,
  bedrooms: Bed,
  bathrooms: Bath,
  livingArea: Ruler,
  yearBuilt: Calendar,
  price: DollarSign,
  lotSize: Trees,
  parkingFeatures: ParkingCircle,
  propertyType: Building,
  city: MapPin,
  elementarySchool: School,
  middleSchool: School,
  highSchool: School,
  cooling: Wind,
  heating: Thermometer,
  appliances: Lightbulb,
  basement: Warehouse,
  exteriorFeatures: Home,
  flooring: Footprints,
  roof: Home,
  view: Eye,
  waterSource: Droplet,
  sewer: Trash2,
  electric: Zap,
  fencing: Fence,
  landscaping: Leaf,
  lot: Mountain,
  construction: HardHat,
  ownershipType: Key,
  propertyCondition: Hammer,
  internet: Wifi,
  atAGlanceFacts: Info
}
