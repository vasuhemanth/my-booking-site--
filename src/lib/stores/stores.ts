import { writable } from 'svelte/store';
import type { TravelPackage, Booking } from '$lib/types/packages';

const samplePackages: TravelPackage[] = [
  { id: '1', name: 'Tropical Getaway', image: '/tropical.jpg', price: 1200, destination: 'Bali', description: 'A relaxing trip to Bali with beaches and culture.', duration: 7, itinerary: ['Day 1: Arrival', 'Day 2: Beach Day', 'Day 3: Temple Tour'] },
  { id: '2', name: 'Mountain Adventure', image: '/mountain.jpg', price: 1500, destination: 'Swiss Alps', description: 'Skiing and hiking in the stunning Alps.', duration: 5, itinerary: ['Day 1: Skiing', 'Day 2: Hiking', 'Day 3: Rest'] },
  { id: '3', name: 'City Explorer', image: '/city.jpg', price: 900, destination: 'Paris', description: 'Discover the charm of Paris with its landmarks and cuisine.', duration: 4, itinerary: ['Day 1: Eiffel Tower', 'Day 2: Louvre Museum', 'Day 3: Seine River Cruise'] },
  { id: '4', name: 'Desert Safari', image: '/desert.jpg', price: 1100, destination: 'Dubai', description: 'An adventurous desert safari with dune bashing and camel rides.', duration: 3, itinerary: ['Day 1: Arrival and Desert Camp', 'Day 2: Dune Bashing', 'Day 3: Camel Ride'] },
  { id: '5', name: 'Island Hopping', image: '/island.jpg', price: 1800, destination: 'Maldives', description: 'Explore the stunning islands of the Maldives with snorkeling and relaxation.', duration: 6, itinerary: ['Day 1: Arrival', 'Day 2: Snorkeling', 'Day 3: Island Tour'] },
  { id: '6', name: 'Cultural Journey', image: '/culture.jpg', price: 1300, destination: 'Kyoto', description: 'Immerse yourself in the rich culture of Kyoto with temples and tea ceremonies.', duration: 5, itinerary: ['Day 1: Arrival', 'Day 2: Temple Visit', 'Day 3: Tea Ceremony'] },
  { id: '7', name: 'Safari Adventure', image: '/safari.jpg', price: 2000, destination: 'Serengeti', description: 'Experience a thrilling safari in the Serengeti with wildlife spotting.', duration: 8, itinerary: ['Day 1: Arrival', 'Day 2: Game Drive', 'Day 3: Safari Camp'] },
  { id: '8', name: 'Northern Lights Tour', image: '/northernlights.jpg', price: 1700, destination: 'Iceland', description: 'Chase the Northern Lights in Iceland with hot springs and glaciers.', duration: 5, itinerary: ['Day 1: Arrival', 'Day 2: Northern Lights Tour', 'Day 3: Golden Circle'] },
  { id: '9', name: 'Wine Tasting Journey', image: '/wine.jpg', price: 1400, destination: 'Tuscany', description: 'Enjoy wine tasting and countryside views in the heart of Tuscany.', duration: 4, itinerary: ['Day 1: Arrival', 'Day 2: Vineyard Tour', 'Day 3: Wine Tasting'] },
  { id: '10', name: 'Ancient Ruins Exploration', image: '/ruins.jpg', price: 1600, destination: 'Machu Picchu', description: 'Explore the ancient ruins of Machu Picchu with a guided trek.', duration: 6, itinerary: ['Day 1: Arrival in Cusco', 'Day 2: Inca Trail', 'Day 3: Machu Picchu Tour'] },
  { id: '11', name: 'Beach Retreat', image: '/beach.jpg', price: 1000, destination: 'Phuket', description: 'Relax on the beautiful beaches of Phuket with water activities.', duration: 5, itinerary: ['Day 1: Arrival', 'Day 2: Beach Day', 'Day 3: Snorkeling'] },
  { id: '12', name: 'Historical Tour', image: '/history.jpg', price: 1200, destination: 'Rome', description: 'Discover the history of Rome with visits to the Colosseum and Vatican.', duration: 4, itinerary: ['Day 1: Arrival', 'Day 2: Colosseum Tour', 'Day 3: Vatican Visit'] },
  { id: '13', name: 'Jungle Expedition', image: '/jungle.jpg', price: 1900, destination: 'Amazon Rainforest', description: 'Explore the Amazon Rainforest with guided tours and wildlife spotting.', duration: 7, itinerary: ['Day 1: Arrival', 'Day 2: Jungle Trek', 'Day 3: River Tour'] },
  { id: '14', name: 'Coastal Drive', image: '/coast.jpg', price: 1300, destination: 'Amalfi Coast', description: 'Drive along the stunning Amalfi Coast with stops in picturesque towns.', duration: 5, itinerary: ['Day 1: Arrival in Sorrento', 'Day 2: Amalfi Drive', 'Day 3: Positano Visit'] },
  { id: '15', name: 'Adventure in the Outback', image: '/outback.jpg', price: 2100, destination: 'Australia', description: 'Explore the Australian Outback with Uluru and unique wildlife.', duration: 6, itinerary: ['Day 1: Arrival in Alice Springs', 'Day 2: Uluru Tour', 'Day 3: Kings Canyon'] }
];

console.log('samplePackages in stores.ts:', samplePackages);

let initialBookings: Booking[] = [];
try {
  const storedBookings = localStorage.getItem('bookings');
  initialBookings = storedBookings ? JSON.parse(storedBookings) : [];
  console.log('Initial bookings from localStorage:', initialBookings);
} catch (error) {
  console.error('Error parsing bookings from localStorage:', error);
  initialBookings = [];
}

export const packages = writable<TravelPackage[]>(samplePackages);
export const bookings = writable<Booking[]>(initialBookings);
export const searchResults = writable<TravelPackage[]>(samplePackages);

bookings.subscribe((value) => {
  console.log('bookings store updated:', value);
  try {
    localStorage.setItem('bookings', JSON.stringify(value));
    console.log('Successfully saved bookings to localStorage:', value);
  } catch (error) {
    console.error('Error saving bookings to localStorage:', error);
  }
});