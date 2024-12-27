'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BedIcon, BathIcon, SquareIcon } from 'lucide-react'

export function HouseCard({ house }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <Image
            src={house.imgSrc}
            alt={house.streetAddress}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">{house.streetAddress}</h2>
          <p className="text-2xl font-bold text-primary mb-2">
            ${house.price.toLocaleString()}
          </p>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="secondary">{house.homeType}</Badge>
            <Badge variant="outline">
              {house.homeStatus.replaceAll('_', ' ')}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <BedIcon className="mr-1 h-4 w-4" />
              <span>{house.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <BathIcon className="mr-1 h-4 w-4" />
              <span>{house.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <SquareIcon className="mr-1 h-4 w-4" />
              <span>{(house.lotAreaValue||"-1").toLocaleString()} {house.lotAreaUnit}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted p-4">
          <Link href={`/houses/${house.zpid}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
