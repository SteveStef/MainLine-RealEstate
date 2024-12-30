'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {useRef} from "react"
import { Search } from 'lucide-react';

export function SearchAndFilterBar({ StandaloneSearchBox , filters, setFilters, requestToggle, setRequestToggle }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setRequestToggle(!requestToggle);
  };

  const searchBoxRef = useRef(null);

  console.log(filters);

  return (
    <div className="space-y-4">
<form onSubmit={(e) => {
  e.preventDefault();
  handleSearch();
}} className="w-full" style={{ position: 'relative' }}>
  <StandaloneSearchBox
    onLoad={(ref) => {
      searchBoxRef.current = ref;
    }}
    onPlacesChanged={() => {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const location = places[0].formatted_address;
        handleFilterChange('location', location);
        handleSearch();
      }
    }}
    style={{ display: 'block', width: '100%' }}
  >
    <Input
      placeholder="Enter location, address, or ZIP"
      value={filters.location}
      onChange={(e) => handleFilterChange('location', e.target.value)}
      style={{ width: '100%', paddingRight: '40px' }} // Add space for the icon
    />
  </StandaloneSearchBox>

  {/* Magnifying Glass Icon */}
  <Search
    onClick={handleSearch}
    style={{
      position: 'absolute',
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#888', // Adjust the color as needed
    }}
  />
</form>
      <div className="flex flex-wrap gap-2">
        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="forSale">For Sale</SelectItem>
            <SelectItem value="forRent">For Rent</SelectItem>
            <SelectItem value="recentlySold">Recently Sold</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">More Filters</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your search with additional filters.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Price Range</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.price_min}
                    onChange={(e) => handleFilterChange('price_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.price_max}
                    onChange={(e) => handleFilterChange('price_max', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Bedrooms</Label>
                <Select
                  value={filters.beds_min?.toString() || "0"}
                  onValueChange={(value) => handleFilterChange('beds_min', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Bathrooms</Label>
                <Select
                  value={filters.baths_min?.toString() || "0"}
                  onValueChange={(value) => handleFilterChange('baths_min', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Square Feet</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.sqft_min}
                    onChange={(e) => handleFilterChange('sqft_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.sqft_max}
                    onChange={(e) => handleFilterChange('sqft_max', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Property Type</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'isSingleFamily', label: 'Single Family' },
                    { key: 'isMultiFamily', label: 'Multi-Family' },
                    { key: 'isApartment', label: 'Apartment' },
                    { key: 'isCondo', label: 'Condo' },
                    { key: 'isTownhouse', label: 'Townhouse' },
                    { key: 'isLotLand', label: 'Lot/Land' },
                  ].map(({ key, label }) => (
                    <Button
                      key={key}
                      variant={filters[key] ? 'default' : 'outline'}
                      onClick={() => handleFilterChange(key, !filters[key])}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="hasPool"
                  checked={filters.hasPool || false}
                  onCheckedChange={(checked) => handleFilterChange('hasPool', checked)}
                />
                <Label htmlFor="hasPool">Has Pool</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="hasGarage"
                  checked={filters.hasGarage || false}
                  onCheckedChange={(checked) => handleFilterChange('hasGarage', checked)}
                />
                <Label htmlFor="hasGarage">Has Garage</Label>
              </div>
              <div className="grid gap-2">
                <Label>Days on Market</Label>
                <Select
                  value={filters.daysOnMarket}
                  onValueChange={(value) => handleFilterChange('daysOnMarket', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSearch}>Apply Filters</Button>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
