"use client";

import { HouseCard } from '../../components/house-card';
import { SearchAndFilterBar } from '@/components/search-and-filter-bar';
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from 'lucide-react';
import { StandaloneSearchBox, useJsApiLoader, GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import React, {useRef} from "react";
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import Header from "@/components/Header.jsx";

const mark = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C9.47715 0 5 4.47715 5 10C5 17.5 15 30 15 30C15 30 25 17.5 25 10C25 4.47715 20.5228 0 15 0Z" fill="#3B82F6"/>
  <circle cx="15" cy="10" r="5" fill="white"/>
</svg>

const center = {
  lat: 40.0462,
  lng: -75.3499,
}


function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [JSON.stringify(value), delay]); // Ensure deep comparison

  return debouncedValue;
}

export default function HousesPage({ searchParams }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    libraries: ["places"]
  });

  const onLoad = React.useCallback(function callback(map) {
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
  }, [])

  const isMobile = useIsMobile();

  const [houses, setHouses] = useState([]);
  const [requestToggle, setRequestToggle] = useState(false);
  const [hoveredHouse, setHoveredHouse] = useState(null);
  const hoverTimeoutRef = useRef(null);
  const [isInfoWindowHovered, setIsInfoWindowHovered] = useState(false);
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    location: searchParams?.location || "",
    status: searchParams?.status || "forSale",
    price_min: searchParams?.price_min || "",
    price_max: searchParams?.price_max || "",
    beds_min: searchParams?.beds_min || "",
    beds_max: searchParams?.beds_max || "",
    baths_min: searchParams?.baths_min || "",
    baths_max: searchParams?.baths_max || "",
    sqft_min: searchParams?.sqft_min || "",
    sqft_max: searchParams?.sqft_max || "",
    isSingleFamily: searchParams?.isSingleFamily === "true",
    isMultiFamily: searchParams?.isMultiFamily === "true",
    isApartment: searchParams?.isApartment === "true",
    isCondo: searchParams?.isCondo === "true",
    isTownhouse: searchParams?.isTownhouse === "true",
    isLotLand: searchParams?.isLotLand === "true",
    hasPool: searchParams?.hasPool === "true",
    hasGarage: searchParams?.hasGarage === "true",
    singleStory: searchParams?.singleStory === "true",
    isManufactured: searchParams?.isManufactured || "",
    doz: searchParams?.doz || "",
    page: searchParams?.page || "1",
    sortSelection: searchParams?.sortSelection || "",
    monthlyPayment_min: searchParams?.monthlyPayment_min || "",
    monthlyPayment_max: searchParams?.monthlyPayment_max || "",
    hoa_min: searchParams?.hoa_min || "",
    hoa_max: searchParams?.hoa_max || "",
    parkingSpots_min: searchParams?.parkingSpots_min || "",
    greatSchoolsRating_min: searchParams?.greatSchoolsRating_min || "",
    lotSize_min: searchParams?.lotSize_min || "",
    lotSize_max: searchParams?.lotSize_max || ""
  });

  const debouncedFilter = useDebounce(filters, 500);
  const lastLocationRef = useRef(filters.location); // Store last location value

  useEffect(() => {
    if (!requestToggle && lastLocationRef.current !== debouncedFilter.location) {
      lastLocationRef.current = debouncedFilter.location;
      return;
    }
    async function searchProperties() {
      setLoad(true);
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/getPropertyByCity`;
        const options = { method: "POST", headers: { "Content-Type": 'application/json' }, body: JSON.stringify(filters) };
        const data = await fetch(url, options);
        if(data.ok) {
          const text = await data.text(); 
          const jsonRes = await JSON.parse(text);
          if(jsonRes.error || jsonRes.results.error) {
            setHouses([]);
            setTotalPages(1);
          } else if(jsonRes.results.length === 2 && jsonRes.results[1] === 200) {
            const formattedAddress = encodeURIComponent(filters.location.trim());
            router.push(`/properties/${formattedAddress}`);
            return;
          } else {
            setHouses(jsonRes.results);
            setTotalPages(jsonRes.totalPages || 1); // Assuming the API returns totalPages
          }
        }
      } catch(err) {
        console.log(err);
        setHouses([]);
        setTotalPages(1);
      }
      setLoad(false);
    }
    searchProperties();
    setRequestToggle(false); // able to search again 
  }, [debouncedFilter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prevFilters => ({
        ...prevFilters,
        page: newPage.toString()
      }));
    }
  };

  return (
    <>
      <Header />
      <br></br>
      <br></br>
      <br></br>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Properties For Sale in the Main Line</h1>
            {isLoaded && (
              <SearchAndFilterBar 
                StandaloneSearchBox={StandaloneSearchBox} 
                filters={filters} 
                setFilters={setFilters} 
                requestToggle={requestToggle} 
                setRequestToggle={setRequestToggle} 
              />
            )}
            <div className="mt-6">
              {load ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : !load && houses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {houses.map((house, idx) => (
                      <div key={idx}><HouseCard house={house} /></div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => handlePageChange(parseInt(filters.page) - 1)}
                      disabled={filters.page === "1"}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous Page
                    </button>
                    <span>Page {filters.page} of {totalPages}</span>
                    <button
                      onClick={() => handlePageChange(parseInt(filters.page) + 1)}
                      disabled={parseInt(filters.page) >= totalPages}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Page
                    </button>
                  </div>
                </>
              ) : houses.length === 0 ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No houses found</AlertTitle>
                  <AlertDescription>
                    We could not find any houses matching your search criteria. Please try adjusting your filters.
                  </AlertDescription>
                </Alert>
              ) : <></>
              }
            </div>
          </div>
        </div>
        {
          !isMobile && 
        <div className="w-1/2 h-screen">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={12}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {houses.map((house, idx) => (
                <div key={idx}>
                  <Marker
                    position={{
                      lat: house.latitude,
                      lng: house.longitude,
                    }}
                    icon={{
                      url: mark,
                      scaledSize: new google.maps.Size(30, 30),
                      anchor: new google.maps.Point(15, 30),
                    }}
                    label={{
                      text: "$" + (house.price || "").toLocaleString(),
                      color: "#1a202c",
                      fontSize: "12px",
                      fontWeight: "600",
                      className: "bg-white px-2 py-1 rounded shadow",
                    }}
                    onMouseOver={() => {
                      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                      setHoveredHouse(house);
                    }}
                    onMouseOut={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        if (!isInfoWindowHovered) setHoveredHouse(null);
                      }, 300);
                    }}
                  />
                  {hoveredHouse === house && (
                    <InfoWindow
                      position={{
                        lat: house.latitude,
                        lng: house.longitude,
                      }}
                      onCloseClick={() => setHoveredHouse(null)}
                      options={{
                        disableAutoPan: true,
                        pixelOffset: new google.maps.Size(0, 8),
                      }}
                    >
                      <div
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                          setIsInfoWindowHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsInfoWindowHovered(false);
                          hoverTimeoutRef.current = setTimeout(() => {
                            setHoveredHouse(null);
                          }, 300);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'default',
                        }}
                      >
                        <Image
                          src={house.imgSrc || '/placeholder-image.jpg'}
                          alt="House Image"
                          width={100}
                          height={75}
                          style={{
                            objectFit: 'cover',
                            borderRadius: '5px',
                            marginRight: '10px',
                          }}
                        />
                        <div>
                          <Link href={`/properties/${encodeURIComponent((`${house.streetAddress} ${house.city} ${house.state}`.trim()))}`}>
                            <h3 className="font-bold text-blue-700">{house.streetAddress}</h3>
                          </Link>
                          <span>
                            {house.lotAreaValue ? house.lotAreaValue.toLocaleString() : ''} {house.lotAreaUnit}
                          </span>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </div>
              ))}
            </GoogleMap>
          )}
        </div>
        }
      </div>
    </>
  )
}

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};
