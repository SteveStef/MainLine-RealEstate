
'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function FilterBar() {
  const [sortBy, setSortBy] = useState('price-asc')

  return (
    <div className="flex justify-end mb-4">
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="beds-asc">Beds: Low to High</SelectItem>
          <SelectItem value="beds-desc">Beds: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

