export const tours = [ 
  { 
    id: 1, 
    slug: "ooty-hill-station", 
    title: "Ooty Hill Station Tour", 
    location: "Ooty", 
    duration: "2 Days / 1 Night", 
    price: "5,999", 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1593055319803-014e7616890c?q=80&w=2070&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1593055319803-014e7616890c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606297011030-a9829b4e5491?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Experience the beauty of the Nilgiris with scenic views and tea gardens. Ooty, also known as Udhagamandalam, is a hill station in the state of Tamil Nadu, in southern India. Surrounded by the Nilgiri Hills, it is also known as the 'Queen of Hill Stations'.", 
    highlights: [ 
      "Ooty Lake Boating", 
      "Botanical Garden Visit", 
      "Doddabetta Peak", 
      "Tea Factory Tour" 
    ], 
    itinerary: [ 
      { 
        day: 1, 
        title: "Arrival & Local Sightseeing", 
        description: "Arrival at Ooty. Check-in to your hotel. Visit Ooty Lake for boating and enjoy the Botanical Garden. Overnight stay in Ooty." 
      }, 
      { 
        day: 2, 
        title: "Peak Visit & Departure", 
        description: "Visit Doddabetta Peak for a panoramic view of the Nilgiris. Explore the Tea Factory and Museum. Afternoon shopping at Charing Cross. Departure in the evening." 
      } 
    ], 
    includes: ["Hotel Stay", "Private Cab", "Sightseeing", "Breakfast"], 
    excludes: ["Personal Expenses", "Entry Tickets", "Lunch & Dinner"], 
    featured: true,
  }, 
  { 
    id: 2, 
    slug: "kodaikanal-lake-view", 
    title: "Kodaikanal Lake View Tour", 
    location: "Kodaikanal", 
    duration: "3 Days / 2 Nights", 
    price: "7,999", 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1599342730607-42f02632b73b?q=80&w=2070&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1599342730607-42f02632b73b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Experience misty mountains and peaceful lakes. Kodaikanal is a hill station in the southern Indian state of Tamil Nadu. Its name in the Tamil language means 'The Gift of the Forest'.", 
    highlights: [ 
      "Kodai Lake Boating", 
      "Coaker's Walk", 
      "Pillar Rocks", 
      "Silver Cascade Falls" 
    ], 
    itinerary: [ 
      { 
        day: 1, 
        title: "Arrival in Kodaikanal", 
        description: "Arrival at Kodaikanal. Check-in to hotel. Relax and evening walk around Kodai Lake. Overnight stay." 
      }, 
      { 
        day: 2, 
        title: "Sightseeing Extravaganza", 
        description: "Full day sightseeing including Coaker's Walk, Upper Lake View, Pine Forest, and Pillar Rocks. Overnight stay." 
      },
      { 
        day: 3, 
        title: "Falls & Departure", 
        description: "Visit Silver Cascade Falls. Free time for shopping homemade chocolates. Departure in the afternoon." 
      } 
    ], 
    includes: ["Resort Stay", "AC Vehicle", "Daily Breakfast", "Driver Allowance"], 
    excludes: ["Entry Fees", "Personal Laundry", "Extra Meals"], 
    featured: false,
  }, 
  { 
    id: 3, 
    slug: "chennai-city-tour", 
    title: "Chennai City Tour", 
    location: "Chennai", 
    duration: "1 Day", 
    price: "2,999", 
    rating: 4.2, 
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Explore Marina Beach and city landmarks. Chennai, on the Bay of Bengal in eastern India, is the capital of the state of Tamil Nadu.", 
    highlights: [ 
      "Marina Beach", 
      "Kapaleeshwarar Temple", 
      "Fort St. George", 
      "Santhome Cathedral" 
    ], 
    itinerary: [ 
      { 
        day: 1, 
        title: "Full Day City Exploration", 
        description: "Morning visit to Kapaleeshwarar Temple. Proceed to Marina Beach. Afternoon visit to Fort St. George and Santhome Cathedral. Evening shopping at T-Nagar." 
      } 
    ], 
    includes: ["AC Cab for 10 Hours", "Toll & Parking", "Local Guide"], 
    excludes: ["Food & Beverages", "Monument Tickets"], 
    featured: false,
  }, 
];

export const services = [
  {
    title: "Domestic Tours",
    description: "Explore the diverse beauty of India, from the Himalayas to the backwaters of Kerala.",
    icon: "Map"
  },
  {
    title: "International Tours",
    description: "Discover global destinations with our carefully curated international tour packages.",
    icon: "Globe"
  },
  {
    title: "Honeymoon Packages",
    description: "Create unforgettable memories with your partner in the most romantic destinations.",
    icon: "Heart"
  },
  {
    title: "Family Trips",
    description: "Enjoy quality time with your loved ones with our family-friendly itineraries.",
    icon: "Users"
  },
  {
    title: "Group Tours",
    description: "Travel with like-minded people and make new friends on our organized group tours.",
    icon: "UserGroup"
  },
  {
    title: "Custom Packages",
    description: "Tailor-made travel experiences designed exactly according to your preferences.",
    icon: "Settings"
  }
];

export const destinations = [
  {
    id: "d1",
    name: "Ooty",
    image: "https://images.unsplash.com/photo-1593055319803-014e7616890c?q=80&w=2070&auto=format&fit=crop",
    price: "4,999",
    rating: 4.8,
    slug: "ooty"
  },
  {
    id: "d2",
    name: "Thekkady",
    image: "https://images.unsplash.com/photo-1599342730607-42f02632b73b?q=80&w=2070&auto=format&fit=crop",
    price: "5,999",
    rating: 4.7,
    slug: "thekkady"
  },
  {
    id: "d3",
    name: "Kodaikanal",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop",
    price: "5,499",
    rating: 4.7,
    slug: "kodaikanal"
  },
  {
    id: "d4",
    name: "Munnar",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=2069&auto=format&fit=crop",
    price: "6,499",
    rating: 4.9,
    slug: "munnar"
  },
  {
    id: "d5",
    name: "Wayanad",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop",
    price: "5,299",
    rating: 4.6,
    slug: "wayanad"
  }
];

export const travelPackages = [
  {
    category: "Honeymoon Packages",
    priceRange: "₹15,000 - ₹45,000",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
    features: ["Private Pool Villas", "Romantic Dinners", "Flower Bed Decoration", "Photo Session"],
    cta: "View Packages"
  },
  {
    category: "Family Packages",
    priceRange: "₹25,000 - ₹75,000",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=2071&auto=format&fit=crop",
    features: ["Spacious Rooms", "Kid-Friendly Activities", "Group Sightseeing", "All Meals Included"],
    cta: "View Packages"
  },
  {
    category: "Budget Packages",
    priceRange: "₹5,000 - ₹15,000",
    image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop",
    features: ["Economy Hotels", "Public Transport Tours", "Essential Sightseeing", "Budget Dining"],
    cta: "View Packages"
  },
  {
    category: "Luxury Packages",
    priceRange: "₹50,000 - ₹1,50,000",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop",
    features: ["5-Star Resorts", "Private Jet/Cabs", "Personal Concierge", "Premium Experiences"],
    cta: "View Packages"
  }
];

export const stats = [
  { label: "Happy Travelers", value: "50K+" },
  { label: "Years Experience", value: "10+" },
  { label: "Support", value: "24/7" },
  { label: "Destinations", value: "100+" }
];

export const trustCards = [
  { title: "Transparent Pricing", description: "No hidden costs or surprise charges. What you see is what you pay." },
  { title: "Professional Drivers", description: "Background-checked, experienced, and punctual staff for safe journeys." },
  { title: "Wide Coverage", description: "Serving all of Tamil Nadu, Pondicherry, and Bangalore with reliable service." },
  { title: "Clean Fleet", description: "Sanitized and well-maintained AC cars for a comfortable ride." }
];

export const testimonialData = [
  {
    name: "Amit Sharma",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    review: "Our Kerala backwaters tour with SV Tour & Travels was absolutely magical! The houseboat experience was unforgettable, and the food was delicious.",
    rating: 5,
    tour: "Kerala Backwaters"
  },
  {
    name: "Priya Singh",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    review: "Perfect honeymoon package to Manali! The resort was stunning, and the snow activities were so much fun. Thank you for making our trip special!",
    rating: 5,
    tour: "Manali Honeymoon"
  },
  {
    name: "Rahul Verma",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    review: "Goa trip with 10 friends was a blast! The beach resort was perfect, and the water sports package was totally worth it!",
    rating: 4,
    tour: "Goa Beach Tour"
  },
  {
    name: "Sneha Reddy",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    review: "Ooty tour with family was amazing! The botanical gardens and tea factory visit were highlights. The driver was very knowledgeable.",
    rating: 5,
    tour: "Ooty Hill Station"
  },
  {
    name: "Vikram Patel",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop",
    review: "Kodaikanal tour was fantastic! The lake boating and Coaker's Walk were incredible. The accommodation was very comfortable.",
    rating: 5,
    tour: "Kodaikanal Tour"
  },
  {
    name: "Ananya Nair",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1970&auto=format&fit=crop",
    review: "Best travel experience ever! The team at SV Tours is very professional. We'll definitely book with them again!",
    rating: 5,
    tour: "Munnar Tea Garden"
  }
];
