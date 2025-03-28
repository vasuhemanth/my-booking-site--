<script lang="ts">
  import { packages, bookings } from '$lib/stores/stores';
  import type { Booking } from '$lib/types/packages';
  import { page } from '$app/stores';

  const packageId = $page.params.id;

  console.log('packageId from $page.params.id:', packageId);
  console.log('packages:', $packages);

  const pkg = $derived($packages.find((p) => p.id === packageId));

  console.log('Found package:', );

  let userName = $state('');
  let email = $state('');
  let travelers = $state(1);

  function handleBooking(event: Event) {
    event.preventDefault();
    if (!pkg) return;
    const newBooking: Booking = { packageId: pkg.id, userName, email, travelers };
    console.log('New booking to be added:', newBooking);
    bookings.update((current) => {
      const updatedBookings = [...current, newBooking];
      console.log('Updated bookings in store:', updatedBookings);
      return updatedBookings;
    });
    alert('Booking successful! Redirecting to your bookings...');
    userName = '';
    email = '';
    travelers = 1;
    window.location.href = '/bookings';
  }
</script>


<div class="min-h-screen bg-gradient-custom">
  <nav class="bg-gray-800 text-white p-4 shadow-lg">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <a href="/" class="text-xl font-bold tracking-wide">Travel Booking Site</a>
      <div class="space-x-4">
        <a href="/" class="hover:underline hover:text-blue-300 transition-colors duration-300">Home</a>
        <a href="/bookings" class="hover:underline hover:text-blue-300 transition-colors duration-300">My Bookings</a>
      </div>
    </div>
  </nav>

  {#if pkg}
    <main class="max-w-4xl mx-auto p-4">
      <a
        href="/"
        class="text-blue-500 hover:underline mb-4 inline-block hover:text-blue-700 transition-colors duration-300"
      >
        ← Back to Packages
      </a>
      <div class="bg-white shadow-xl rounded-lg p-6 animate-fade-in">
        <h1 class="text-3xl font-bold mb-4 text-gray-800">{pkg.name}</h1>
        <img
          src={pkg.image}
          alt={pkg.name}
          class="w-full h-64 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300"
        />
        <div class="space-y-3">
          <p><strong class="text-gray-700">Destination:</strong> <span class="text-gray-600">{pkg.destination}</span></p>
          <p><strong class="text-gray-700">Price:</strong> <span class="text-green-600 font-medium">${pkg.price}</span></p>
          <p><strong class="text-gray-700">Duration:</strong> <span class="text-gray-600">{pkg.duration} days</span></p>
          <p><strong class="text-gray-700">Description:</strong> <span class="text-gray-600">{pkg.description}</span></p>
        </div>
        <h3 class="text-xl font-semibold mt-6 mb-2 text-gray-800">Itinerary</h3>
        <ul class="list-disc pl-6 mb-4 text-gray-600">
          {#each pkg.itinerary as item}
            <li class="animate-fade-in">{item}</li>
          {/each}
        </ul>
      </div>
      <form onsubmit={handleBooking} class="space-y-4 mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800">Book This Package</h3>
        <div>
          <label for="userName" class="block text-sm font-medium text-gray-700">Your Name</label>
          <input
            id="userName"
            type="text"
            placeholder="Your Name"
            bind:value={userName}
            required
            class="block w-full border rounded-lg p-2 mt-1 input-focus"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            bind:value={email}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]"
            title="Please enter a valid email address (e.g., example@domain.com)"
            class="block w-full border rounded-lg p-2 mt-1 input-focus"
          />
        </div>
        <div>
          <label for="travelers" class="block text-sm font-medium text-gray-700">Number of Travelers</label>
          <input
            id="travelers"
            type="number"
            placeholder="Travelers"
            bind:value={travelers}
            min="1"
            required
            class="block w-full border rounded-lg p-2 mt-1 input-focus"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 animate-pulse"
        >
          Book Now
        </button>
      </form>
    </main>
  {:else}
    <main class="max-w-4xl mx-auto p-4">
      <p class="text-red-500 font-medium animate-fade-in">Package not found.</p>
      <a
        href="/"
        class="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-300"
      >
        Back to Packages
      </a>
    </main>
  {/if}
</div>