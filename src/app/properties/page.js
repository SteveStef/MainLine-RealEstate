"use client";
import { HouseCard } from '../../components/house-card';
import { SearchAndFilterBar } from '@/components/search-and-filter-bar';
import { useState, useEffect } from "react";

export default function HousesPage({ searchParams }) {
  const [houses, setHouses] = useState([]);
  const [requestToggle, setRequestToggle] = useState(false);

  const [filters, setFilters] = useState({
    location: "Villanova, PA",
    status: "forSale",
    price_min: "",
    price_max: "",
    beds_min: "",
    beds_max: "",
    baths_min: "",
    baths_max: "",
    sqft_min: "",
    sqft_max: "",
    isSingleFamily: false,
    isMultiFamily: false,
    isApartment: false,
    isCondo: false,
    isTownhouse: false,
    isLotLand: false,
    hasPool: false,
    hasGarage: false,
    daysOnMarket: "any",
    page: "1",
  });

  useEffect(() => {
    async function searchProperties() {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/getPropertyByCity`;
        const options = { method: "POST", headers: { "Content-Type": 'application/json' }, body: JSON.stringify(filters) };
        const data = await fetch(url, options);
        console.log(data);
        if(data.ok) {
          const text = await data.text(); 
          const jsonRes = await JSON.parse(text);
          setHouses(jsonRes.results);
        } else {
        setHouses([]);
        }
      } catch(err) {
        console.log(err);
        setHouses([]);
      }
    }
    searchProperties();
  }, [requestToggle]);

  console.log(houses);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Properties For Sale in the Main Line</h1>
      <SearchAndFilterBar filters={filters} setFilters={setFilters} requestToggle={requestToggle} setRequestToggle={setRequestToggle} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {houses.map((house,idx) => (
          <div key={idx}><HouseCard house={house} /></div>
        ))}
      </div>
    </div>
  )
}

