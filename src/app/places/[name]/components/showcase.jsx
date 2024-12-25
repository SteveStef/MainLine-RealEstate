import Image from 'next/image'
import Background from "../../../../realestate.jpg";
import { ImageSlideshow } from '@/components/ImageSlideShow';

export function CityShowcase({ cityName }) {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]">
      <ImageSlideshow />
    </div>
  )
}

