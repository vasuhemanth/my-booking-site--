export interface TravelPackage {
    id: string;
    name: string;
    image: string;
    price: number;
    destination: string;
    description: string;
    duration: number; 
    itinerary: string[];
  }
  
  export interface Booking {
    packageId: string;
    userName: string;
    email: string;
    travelers: number;
  }