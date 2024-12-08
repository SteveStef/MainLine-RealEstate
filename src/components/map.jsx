
import { MapPin } from 'lucide-react'

export function Map() {
  return (
    <div className="relative w-full h-full min-h-[400px] bg-gray-200 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <MapPin className="h-12 w-12 text-primary" />
      </div>
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow">
        <p className="text-sm font-medium">Main Line Area</p>
      </div>
    </div>
  )
}

