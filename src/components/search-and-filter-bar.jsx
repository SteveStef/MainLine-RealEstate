
'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
//import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function SearchAndFilterBar({filters, setFilters, requestToggle, setRequestToggle }) {
  const router = useRouter()

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    setRequestToggle(!requestToggle);
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Enter location, address, or ZIP"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
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
        <Select
          value={filters.sortSelection}
          onValueChange={(value) => handleFilterChange('sortSelection', value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Newest</SelectItem>
            <SelectItem value="priced">Price (High to Low)</SelectItem>
            <SelectItem value="pricea">Price (Low to High)</SelectItem>
            <SelectItem value="beds">Bedrooms</SelectItem>
            <SelectItem value="baths">Bathrooms</SelectItem>
            <SelectItem value="size">Square Feet</SelectItem>
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
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Bedrooms</Label>
                <Select
                  value={filters.bedsMin.toString()}
                  onValueChange={(value) => handleFilterChange('bedsMin', parseInt(value))}
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
                  value={filters.bathsMin.toString()}
                  onValueChange={(value) => handleFilterChange('bathsMin', parseInt(value))}
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
                    value={filters.sqftMin}
                    onChange={(e) => handleFilterChange('sqftMin', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.sqftMax}
                    onChange={(e) => handleFilterChange('sqftMax', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Year Built</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.yearBuiltMin}
                    onChange={(e) => handleFilterChange('yearBuiltMin', e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.yearBuiltMax}
                    onChange={(e) => handleFilterChange('yearBuiltMax', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Property Type</Label>
                <div className="flex flex-wrap gap-2">
                  {['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Land'].map((type) => (
                    <Button
                      key={type}
                      variant={filters.propertyType.includes(type) ? 'default' : 'outline'}
                      onClick={() => {
                        const newTypes = filters.propertyType.includes(type)
                          ? filters.propertyType.filter((t) => t !== type)
                          : [...filters.propertyType, type]
                        handleFilterChange('propertyType', newTypes)
                      }}
                    >
                      {type}
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
                  id="isNewConstruction"
                  checked={filters.isNewConstruction}
                  onCheckedChange={(checked) => handleFilterChange('isNewConstruction', checked)}
                />
                <Label htmlFor="isNewConstruction">New Construction</Label>
              </div>
            </div>
            <Button onClick={handleSearch}>Apply Filters</Button>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

