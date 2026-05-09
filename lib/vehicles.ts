export interface Vehicle {
  id: string;
  name: string;
  type: string;
  seats: number;
  ac: boolean;
  price: number;
  image: string;
  framesPath: string;
  frameCount: number;
  description: string;
  popular?: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "tempo-traveller",
    name: "Tempo Traveller",
    type: "Luxury Van",
    seats: 12,
    ac: true,
    price: 4500,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    framesPath: "/vehicles/tempo-traveller/",
    frameCount: 36,
    description: "Perfect for family and group trips",
    popular: true
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    type: "Premium SUV",
    seats: 7,
    ac: true,
    price: 3500,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    framesPath: "/vehicles/innova/",
    frameCount: 36,
    description: "Comfortable premium long drive SUV"
  },
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    type: "Sedan",
    seats: 4,
    ac: true,
    price: 2500,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    framesPath: "/vehicles/dzire/",
    frameCount: 36,
    description: "Budget friendly comfortable ride"
  }
];
