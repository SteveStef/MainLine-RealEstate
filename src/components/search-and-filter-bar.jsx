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
import { useRef } from "react";
import { Search } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

export function SearchAndFilterBar({ StandaloneSearchBox, filters, setFilters, requestToggle, setRequestToggle }) {
  const handleFilterChange = (key, value) => {
    if(value === "true") value = true;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    setRequestToggle(!requestToggle);
  };

  const searchBoxRef = useRef(null);

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
            style={{ width: '100%', paddingRight: '40px' }}
          />
        </StandaloneSearchBox>

        <Search
          onClick={handleSearch}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#888',
          }}
        />
      </form>

      <div className="flex flex-wrap gap-2">
      <div className="flex">
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

    <Select
    value={filters.sortSelection}
    onValueChange={(value) => handleFilterChange('sortSelection', value)}
    >
    <SelectTrigger>
    <SelectValue placeholder="Select sorting" />
    </SelectTrigger>
    <SelectContent>
    <SelectItem value="priced">Price (High to Low)</SelectItem>
    <SelectItem value="pricea">Price (Low to High)</SelectItem>
    <SelectItem value="priorityScore">Priority Score</SelectItem>
    <SelectItem value="listingStatus">Listing Status</SelectItem>
    <SelectItem value="days">Days on market</SelectItem>
    <SelectItem value="beds">Bedrooms</SelectItem>
    <SelectItem value="baths">Bathrooms</SelectItem>
    <SelectItem value="size">Size</SelectItem>
    <SelectItem value="lot">Lot Size</SelectItem>
    </SelectContent>
    </Select></div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">More Filters</Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
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
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.beds_min}
                    onChange={(e) => handleFilterChange('beds_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.beds_max}
                    onChange={(e) => handleFilterChange('beds_max', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Bathrooms</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.baths_min}
                    onChange={(e) => handleFilterChange('baths_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.baths_max}
                    onChange={(e) => handleFilterChange('baths_max', e.target.value)}
                  />
                </div>
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
                <Label>Monthly Payment</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.monthlyPayment_min}
                    onChange={(e) => handleFilterChange('monthlyPayment_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.monthlyPayment_max}
                    onChange={(e) => handleFilterChange('monthlyPayment_max', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>HOA Fees</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.hoa_min}
                    onChange={(e) => handleFilterChange('hoa_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.hoa_max}
                    onChange={(e) => handleFilterChange('hoa_max', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Parking Spots (Minimum)</Label>
                <Input
                  type="number"
                  value={filters.parkingSpots_min}
                  onChange={(e) => handleFilterChange('parkingSpots_min', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Great Schools Rating (Minimum)</Label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[parseInt(filters.greatSchoolsRating_min) || 1]}
                  onValueChange={(value) => handleFilterChange('greatSchoolsRating_min', value[0].toString())}
                />
                <span>{filters.greatSchoolsRating_min || 1}</span>
              </div>
              <div className="grid gap-2">
                <Label>Lot Size (acres)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.lotSize_min}
                    onChange={(e) => handleFilterChange('lotSize_min', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.lotSize_max}
                    onChange={(e) => handleFilterChange('lotSize_max', e.target.value)}
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
                    { key: 'isManufactured', label: 'Manufactured' },
                    { key: 'isTownhouse', label: 'Townhouse' },
                    { key: 'isLotLand', label: 'Lot/Land' },
                  ].map(({ key, label }) => (
                    <Button
                      key={key}
                      variant={filters[key] ? 'default' : 'outline'}
                      onClick={() => handleFilterChange(key, (!filters[key]))}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="hasPool"
                  checked={filters.hasPool}
                  onCheckedChange={(checked) => handleFilterChange('hasPool', checked)}
                />
                <Label htmlFor="hasPool">Has Pool</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="hasGarage"
                  checked={filters.hasGarage}
                  onCheckedChange={(checked) => handleFilterChange('hasGarage', checked)}
                />
                <Label htmlFor="hasGarage">Has Garage</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="singleStory"
                  checked={filters.singleStory}
                  onCheckedChange={(checked) => handleFilterChange('singleStory', checked)}
                />
                <Label htmlFor="hasPool">Single Story</Label>
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
                    <SelectItem value="6m">6 months</SelectItem>
                    <SelectItem value="12m">12 months</SelectItem>
                    <SelectItem value="24m">24 months</SelectItem>
                    <SelectItem value="36m">36 months</SelectItem>
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

