const placeMap = {
  "brynmawr": {
    name: "Bryn Mawr",
    description: "Bryn Mawr is an affluent community located on Philadelphia's historic Main Line. Known for its prestigious institutions, beautiful architecture, and vibrant community life, Bryn Mawr offers a perfect blend of suburban tranquility and urban convenience.",
    history: "Established in 1869, Bryn Mawr has a rich history deeply intertwined with the development of the Pennsylvania Railroad. The name 'Bryn Mawr' means 'big hill' in Welsh and was named by Rowland Ellis, a Welsh Quaker who originally owned the land.",
    images: [
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
      "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
    ],
    nearbyPlaces: ["Bryn Mawr College", "Harriton House", "Bryn Mawr Film Institute", "Bryn Mawr Hospital"],
    properties: [
      { name: "Elegant Victorian", price: "$1,200,000", bedrooms: 5, bathrooms: 4, sqft: 4200, image: "https://photos.zillowstatic.com/fp/7f0ddfd3619b1d9d8d1c3c04b57a4b9c-cc_ft_1536.webp" },
      { name: "Modern Townhouse", price: "$750,000", bedrooms: 3, bathrooms: 2.5, sqft: 2100, image: "https://photos.zillowstatic.com/fp/b87f0c9b9a7b7f9b9f9b9f9b9f9b9f-cc_ft_1536.webp" },
    ],
    restaurants: [
      {
        name: "Tango",
        cuisine: "American",
        rating: 4.5,
        priceRange: "$$",
        image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
        reviews: [
          { author: "John D.", content: "Great atmosphere and delicious food. The steak was cooked to perfection!", rating: 5 },
          { author: "Sarah M.", content: "Lovely place for a date night. The wine selection is impressive.", rating: 4 },
        ],
      },
      {
        name: "Ekta Indian Cuisine",
        cuisine: "Indian",
        rating: 4.7,
        priceRange: "$$",
        image: "https://photos.zillowstatic.com/fp/d190276102742d7b921353151816d82d-p_e.jpg",
        reviews: [
          { author: "Raj P.", content: "Authentic Indian flavors. The butter chicken is a must-try!", rating: 5 },
          { author: "Emily L.", content: "Extensive menu with great vegetarian options. Friendly staff too.", rating: 4.5 },
        ],
      },
    ],
    schools: [
      { name: "The Baldwin School", type: "Private", rating: 4.8 },
      { name: "The Shipley School", type: "Private", rating: 4.7 },
      { name: "Radnor High School", type: "Public", rating: 4.5 },
    ],
    transportation: [
      "SEPTA Regional Rail - Paoli/Thorndale Line",
      "SEPTA Bus Routes 105 and 106",
      "Easy access to I-476 (Blue Route)",
    ],
    recreation: [
      "Ashbridge Memorial Park",
      "Bryn Mawr Community Center",
      "Harriton House and Park",
    ],
    economicInfo: {
      medianIncome: "$110,000",
      medianHomePrice: "$625,000",
      unemploymentRate: "2.8%",
    },
  },
  "ardmore": {
    name: "Ardmore",
    description: "Ardmore is a vibrant Main Line community with a mix of suburban charm and urban energy, known for its shopping, dining, and cultural events.",
    history: "Originally called Athensville, Ardmore gained prominence with the establishment of the Pennsylvania Railroad in the 19th century.",
    images: [
      "https://photos.zillowstatic.com/fp/ardmore1.jpg",
      "https://photos.zillowstatic.com/fp/ardmore2.jpg",
    ],
    nearbyPlaces: ["Suburban Square", "Ardmore Music Hall", "South Ardmore Park"],
    properties: [
      { name: "Charming Ranch", price: "$550,000", bedrooms: 3, bathrooms: 2, sqft: 1800, image: "https://photos.zillowstatic.com/fp/ardmore_home.jpg" },
      { name: "Luxury Condo", price: "$450,000", bedrooms: 2, bathrooms: 2, sqft: 1400, image: "https://photos.zillowstatic.com/fp/ardmore_condo.jpg" },
    ],
    restaurants: [
      {
        name: "Iron Hill Brewery",
        cuisine: "American",
        rating: 4.6,
        priceRange: "$$",
        image: "https://photos.zillowstatic.com/fp/ardmore_restaurant.jpg",
        reviews: [
          { author: "Mike R.", content: "Great beer selection and tasty food!", rating: 5 },
          { author: "Anna S.", content: "Good vibe and excellent service.", rating: 4 },
        ],
      },
    ],
    schools: [
      { name: "Lower Merion High School", type: "Public", rating: 4.6 },
      { name: "The Haverford School", type: "Private", rating: 4.9 },
    ],
    transportation: [
      "SEPTA Regional Rail - Ardmore Station",
      "SEPTA Bus Routes 105 and 106",
    ],
    recreation: [
      "South Ardmore Park",
      "Ardmore Avenue Community Center",
    ],
    economicInfo: {
      medianIncome: "$90,000",
      medianHomePrice: "$475,000",
      unemploymentRate: "3.1%",
    },
  },
  "villanova": {
    name: "Villanova",
    description: "Villanova is renowned for its prestigious university and luxurious suburban living, offering scenic beauty and rich history.",
    history: "Villanova traces its roots to the 19th century, named after Saint Thomas of Villanova and anchored by the university established by the Augustinians.",
    images: [
      "https://photos.zillowstatic.com/fp/villanova1.jpg",
      "https://photos.zillowstatic.com/fp/villanova2.jpg",
    ],
    nearbyPlaces: ["Villanova University", "Stoneleigh Garden", "Willows Park"],
    properties: [
      { name: "Luxury Estate", price: "$2,500,000", bedrooms: 6, bathrooms: 6, sqft: 7000, image: "https://photos.zillowstatic.com/fp/villanova_estate.jpg" },
      { name: "Modern Colonial", price: "$1,100,000", bedrooms: 4, bathrooms: 4, sqft: 3500, image: "https://photos.zillowstatic.com/fp/villanova_colonial.jpg" },
    ],
    restaurants: [
      {
        name: "The Refectory",
        cuisine: "American",
        rating: 4.8,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/villanova_restaurant.jpg",
        reviews: [
          { author: "Chris L.", content: "Amazing fine dining experience!", rating: 5 },
        ],
      },
    ],
    schools: [
      { name: "Villanova University", type: "College", rating: 5.0 },
      { name: "Agnes Irwin School", type: "Private", rating: 4.9 },
    ],
    transportation: [
      "SEPTA Regional Rail - Villanova Station",
      "Route 100 High-Speed Line",
    ],
    recreation: [
      "Willows Park",
      "Stoneleigh Garden",
    ],
    economicInfo: {
      medianIncome: "$200,000",
      medianHomePrice: "$1,250,000",
      unemploymentRate: "2.5%",
    },
  },
  "wayne": {
    name: "Wayne",
    description: "Wayne is a charming and bustling town located on the Main Line, known for its historic architecture, vibrant downtown, and family-friendly atmosphere.",
    history: "Wayne began as a colonial village and grew rapidly with the expansion of the Pennsylvania Railroad in the 19th century. It became one of the first planned communities in the United States.",
    images: [
      "https://photos.zillowstatic.com/fp/wayne1.jpg",
      "https://photos.zillowstatic.com/fp/wayne2.jpg",
    ],
    nearbyPlaces: ["Wayne Art Center", "Radnor Trail", "Chanticleer Garden"],
    properties: [
      { name: "Classic Victorian", price: "$1,400,000", bedrooms: 5, bathrooms: 4, sqft: 5000, image: "https://photos.zillowstatic.com/fp/wayne_home1.jpg" },
      { name: "Modern Colonial", price: "$850,000", bedrooms: 4, bathrooms: 3.5, sqft: 3200, image: "https://photos.zillowstatic.com/fp/wayne_home2.jpg" },
    ],
    restaurants: [
      {
        name: "Paramour",
        cuisine: "American",
        rating: 4.7,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/wayne_restaurant1.jpg",
        reviews: [
          { author: "Alice K.", content: "Exceptional dining experience with a creative menu.", rating: 5 },
          { author: "Tom P.", content: "Great ambiance and excellent service.", rating: 4.5 },
        ],
      },
    ],
    schools: [
      { name: "Radnor High School", type: "Public", rating: 4.8 },
      { name: "The Episcopal Academy", type: "Private", rating: 4.9 },
    ],
    transportation: [
      "SEPTA Regional Rail - Wayne Station",
      "Easy access to Route 30 and I-476",
    ],
    recreation: [
      "Radnor Trail",
      "Chanticleer Garden",
    ],
    economicInfo: {
      medianIncome: "$150,000",
      medianHomePrice: "$800,000",
      unemploymentRate: "2.9%",
    },
  },
  "radnor": {
    name: "Radnor",
    description: "Radnor is a historic and upscale community offering beautiful homes, top-notch schools, and easy access to urban amenities.",
    history: "Settled by Welsh Quakers in the late 17th century, Radnor became an important Main Line community with the advent of the Pennsylvania Railroad.",
    images: [
      "https://photos.zillowstatic.com/fp/radnor1.jpg",
      "https://photos.zillowstatic.com/fp/radnor2.jpg",
    ],
    nearbyPlaces: ["Radnor Memorial Library", "Radnor Hotel", "Chanticleer Garden"],
    properties: [
      { name: "Luxury Estate", price: "$2,100,000", bedrooms: 6, bathrooms: 6, sqft: 6000, image: "https://photos.zillowstatic.com/fp/radnor_home1.jpg" },
      { name: "Elegant Townhouse", price: "$650,000", bedrooms: 3, bathrooms: 3, sqft: 2400, image: "https://photos.zillowstatic.com/fp/radnor_home2.jpg" },
    ],
    restaurants: [
      {
        name: "White Dog Café",
        cuisine: "American",
        rating: 4.6,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/radnor_restaurant1.jpg",
        reviews: [
          { author: "Jake W.", content: "Innovative dishes with local ingredients. Highly recommended!", rating: 5 },
        ],
      },
    ],
    schools: [
      { name: "Radnor High School", type: "Public", rating: 4.8 },
      { name: "The Agnes Irwin School", type: "Private", rating: 4.9 },
    ],
    transportation: [
      "SEPTA Regional Rail - Radnor Station",
      "Route 100 High-Speed Line",
    ],
    recreation: [
      "Chanticleer Garden",
      "Radnor Trail",
    ],
    economicInfo: {
      medianIncome: "$175,000",
      medianHomePrice: "$950,000",
      unemploymentRate: "2.6%",
    },
  },
  "devon": {
    name: "Devon",
    description: "Devon is a serene and affluent community, best known for the historic Devon Horse Show and its picturesque suburban lifestyle.",
    history: "Devon developed as a residential retreat for wealthy Philadelphians in the late 19th century, with the Devon Horse Show becoming a hallmark of the area.",
    images: [
      "https://photos.zillowstatic.com/fp/devon1.jpg",
      "https://photos.zillowstatic.com/fp/devon2.jpg",
    ],
    nearbyPlaces: ["Devon Horse Show Grounds", "Devon Yard", "Jenkins Arboretum"],
    properties: [
      { name: "Grand Manor", price: "$2,500,000", bedrooms: 6, bathrooms: 5, sqft: 6500, image: "https://photos.zillowstatic.com/fp/devon_home1.jpg" },
      { name: "Charming Colonial", price: "$900,000", bedrooms: 4, bathrooms: 3.5, sqft: 3200, image: "https://photos.zillowstatic.com/fp/devon_home2.jpg" },
    ],
    restaurants: [
      {
        name: "Terrain Café",
        cuisine: "Farm-to-Table",
        rating: 4.8,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/devon_restaurant1.jpg",
        reviews: [
          { author: "Emma S.", content: "Beautiful ambiance and delicious seasonal menu.", rating: 5 },
        ],
      },
    ],
    schools: [
      { name: "Conestoga High School", type: "Public", rating: 4.9 },
      { name: "Devon Preparatory School", type: "Private", rating: 4.8 },
    ],
    transportation: [
      "SEPTA Regional Rail - Devon Station",
    ],
    recreation: [
      "Devon Horse Show Grounds",
      "Jenkins Arboretum",
    ],
    economicInfo: {
      medianIncome: "$160,000",
      medianHomePrice: "$950,000",
      unemploymentRate: "2.7%",
    },
  },
  "malvern": {
    name: "Malvern",
    description: "Malvern is a quaint and historic town with a welcoming community, featuring a blend of historic charm and modern conveniences.",
    history: "Malvern played a significant role during the Revolutionary War, with the nearby Paoli Battlefield serving as a historical landmark.",
    images: [
      "https://photos.zillowstatic.com/fp/malvern1.jpg",
      "https://photos.zillowstatic.com/fp/malvern2.jpg",
    ],
    nearbyPlaces: ["Paoli Battlefield Historical Park", "Great Valley Nature Center"],
    properties: [
      { name: "Rustic Farmhouse", price: "$1,200,000", bedrooms: 5, bathrooms: 4, sqft: 4200, image: "https://photos.zillowstatic.com/fp/malvern_home1.jpg" },
      { name: "Modern Ranch", price: "$700,000", bedrooms: 3, bathrooms: 2, sqft: 2000, image: "https://photos.zillowstatic.com/fp/malvern_home2.jpg" },
    ],
    restaurants: [
      {
        name: "General Warren",
        cuisine: "American",
        rating: 4.7,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/malvern_restaurant1.jpg",
        reviews: [
          { author: "Nina T.", content: "A historic gem with exquisite food and service.", rating: 5 },
        ],
      },
    ],
    schools: [
      { name: "Great Valley High School", type: "Public", rating: 4.6 },
      { name: "Malvern Preparatory School", type: "Private", rating: 4.8 },
    ],
    transportation: [
      "SEPTA Regional Rail - Malvern Station",
      "Amtrak Keystone Service",
    ],
    recreation: [
      "Paoli Battlefield Park",
      "East Whiteland Park",
    ],
    economicInfo: {
      medianIncome: "$140,000",
      medianHomePrice: "$700,000",
      unemploymentRate: "3.1%",
    },
  },
  "overbrook": {
    name: "Overbrook",
    description: "Overbrook is a vibrant and historic neighborhood located on the western edge of Philadelphia. Known for its beautiful tree-lined streets, diverse community, and classic architecture, Overbrook offers a suburban feel within the city.",
    history: "Overbrook began developing in the late 19th century as a residential area, particularly with the advent of the Pennsylvania Railroad. Its name derives from the nearby Mill Creek and its proximity to the Overbrook Station.",
    images: [
      "https://photos.zillowstatic.com/fp/overbrook1.jpg",
      "https://photos.zillowstatic.com/fp/overbrook2.jpg",
    ],
    nearbyPlaces: ["Overbrook High School", "Overbrook Farms Historic District", "Fairmount Park"],
    properties: [
      { name: "Classic Rowhouse", price: "$250,000", bedrooms: 3, bathrooms: 1.5, sqft: 1500, image: "https://photos.zillowstatic.com/fp/overbrook_home1.jpg" },
      { name: "Spacious Twin", price: "$350,000", bedrooms: 4, bathrooms: 2, sqft: 1800, image: "https://photos.zillowstatic.com/fp/overbrook_home2.jpg" },
    ],
    restaurants: [
      {
        name: "Booker's Restaurant & Bar",
        cuisine: "American",
        rating: 4.5,
        priceRange: "$$",
        image: "https://photos.zillowstatic.com/fp/overbrook_restaurant1.jpg",
        reviews: [
          { author: "Rachel F.", content: "Fantastic local spot with great food and atmosphere.", rating: 5 },
          { author: "James L.", content: "Good service and a welcoming vibe.", rating: 4 },
        ],
      },
    ],
    schools: [
      { name: "Overbrook High School", type: "Public", rating: 3.5 },
      { name: "St. Joseph's Preparatory School", type: "Private", rating: 4.6 },
    ],
    transportation: [
      "SEPTA Regional Rail - Overbrook Station",
      "SEPTA Bus Routes 65 and 105",
    ],
    recreation: [
      "Morris Park",
      "Fairmount Park Trails",
    ],
    economicInfo: {
      medianIncome: "$45,000",
      medianHomePrice: "$275,000",
      unemploymentRate: "5.2%",
    },
  },
  "gladwyne": {
    name: "Gladwyne",
    description: "Gladwyne is a picturesque and affluent village located on Philadelphia’s Main Line. Known for its large estates, historic charm, and peaceful environment, Gladwyne offers residents a tranquil escape with convenient access to the city.",
    history: "Gladwyne was originally settled in the late 17th century by Welsh Quakers. Over time, it developed into a prominent residential area, maintaining much of its rural charm due to dedicated preservation efforts.",
    images: [
      "https://photos.zillowstatic.com/fp/gladwyne1.jpg",
      "https://photos.zillowstatic.com/fp/gladwyne2.jpg",
    ],
    nearbyPlaces: ["Riverbend Environmental Education Center", "Gladwyne Library", "Philadelphia Country Club"],
    properties: [
      { name: "Historic Estate", price: "$3,500,000", bedrooms: 6, bathrooms: 7, sqft: 8500, image: "https://photos.zillowstatic.com/fp/gladwyne_home1.jpg" },
      { name: "Modern Farmhouse", price: "$2,100,000", bedrooms: 5, bathrooms: 4.5, sqft: 5000, image: "https://photos.zillowstatic.com/fp/gladwyne_home2.jpg" },
    ],
    restaurants: [
      {
        name: "Gladwyne Market House",
        cuisine: "American",
        rating: 4.7,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/gladwyne_restaurant1.jpg",
        reviews: [
          { author: "Anna T.", content: "Amazing gourmet options and friendly service.", rating: 5 },
          { author: "Mike B.", content: "A perfect spot for brunch in a serene setting.", rating: 4.5 },
        ],
      },
    ],
    schools: [
      { name: "Gladwyne Elementary School", type: "Public", rating: 4.8 },
      { name: "The Baldwin School", type: "Private", rating: 4.9 },
    ],
    transportation: [
      "SEPTA Bus Route 44",
      "Nearby access to I-76 and Route 23",
    ],
    recreation: [
      "Riverbend Environmental Education Center",
      "Gladwyne Park",
    ],
    economicInfo: {
      medianIncome: "$250,000",
      medianHomePrice: "$1,800,000",
      unemploymentRate: "2.2%",
    },
  },
  "haverford": {
    name: "Haverford",
    description: "Haverford is a historic and prestigious Main Line community known for its beautiful homes, top-tier schools, and the renowned Haverford College. It offers a blend of suburban tranquility and academic influence.",
    history: "Haverford's history dates back to the 17th century, when it was settled by Welsh Quakers. Over time, it became a significant part of the Main Line due to its connection to the Pennsylvania Railroad and the establishment of Haverford College in 1833.",
    images: [
      "https://photos.zillowstatic.com/fp/haverford1.jpg",
      "https://photos.zillowstatic.com/fp/haverford2.jpg",
    ],
    nearbyPlaces: ["Haverford College", "Haverford Reserve", "Merion Cricket Club"],
    properties: [
      { name: "Elegant Tudor", price: "$1,800,000", bedrooms: 5, bathrooms: 5, sqft: 5200, image: "https://photos.zillowstatic.com/fp/haverford_home1.jpg" },
      { name: "Spacious Colonial", price: "$1,200,000", bedrooms: 4, bathrooms: 3.5, sqft: 4000, image: "https://photos.zillowstatic.com/fp/haverford_home2.jpg" },
    ],
    restaurants: [
      {
        name: "White Dog Café",
        cuisine: "American",
        rating: 4.8,
        priceRange: "$$$",
        image: "https://photos.zillowstatic.com/fp/haverford_restaurant1.jpg",
        reviews: [
          { author: "Olivia J.", content: "Fantastic menu with locally sourced ingredients. A great spot for dinner!", rating: 5 },
          { author: "Brian K.", content: "Charming ambiance and friendly staff. Highly recommend the dessert menu.", rating: 4.5 },
        ],
      },
      {
        name: "Green Engine Coffee",
        cuisine: "Café",
        rating: 4.6,
        priceRange: "$",
        image: "https://photos.zillowstatic.com/fp/haverford_restaurant2.jpg",
        reviews: [
          { author: "Emma W.", content: "Perfect spot for a latte and light lunch. Cozy and inviting atmosphere.", rating: 5 },
          { author: "Sam H.", content: "Great coffee and pastries. A nice place to relax or work.", rating: 4 },
        ],
      },
    ],
    schools: [
      { name: "Haverford College", type: "College", rating: 4.9 },
      { name: "Friends School Haverford", type: "Private", rating: 4.7 },
      { name: "Lower Merion High School", type: "Public", rating: 4.6 },
    ],
    transportation: [
      "SEPTA Regional Rail - Haverford Station",
      "Nearby access to Lancaster Avenue and I-476",
    ],
    recreation: [
      "Haverford Reserve",
      "Merion Cricket Club",
      "Haverford College Arboretum",
    ],
    economicInfo: {
      medianIncome: "$145,000",
      medianHomePrice: "$800,000",
      unemploymentRate: "2.9%",
    },
  },
};

export default function getPlaceInfoByName(name) {
  const place = name.replace("%20","").toLowerCase().trim();
  console.log(place);
  return placeMap[place] || null;
}
