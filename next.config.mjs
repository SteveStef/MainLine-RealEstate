/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images: {
    unoptimized: true,
    domains: ['photos.zillowstatic.com', 'maps.googleapis.com'], // Add the allowed domain(s) here
  },
};

export default nextConfig;
