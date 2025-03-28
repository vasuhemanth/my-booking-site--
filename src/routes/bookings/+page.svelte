<script lang="ts">
    import { packages, bookings } from '$lib/stores/stores';
    import type { TravelPackage, Booking } from '$lib/types/packages';
  
    const bookingDetails = $derived(
      $bookings.map((booking: Booking) => {
        const pkg = $packages.find((p) => p.id === booking.packageId);
        return { booking, package: pkg };
      })
    );
  </script>
  
  <div class="min-h-screen bg-gray-100">
    
    <nav class="bg-gray-800 text-white p-4 shadow-lg">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <a href="/" class="text-xl font-bold tracking-wide">Travel Booking Site</a>
        <div class="space-x-4">
          <a href="/" class="hover:underline hover:text-blue-300 transition-colors duration-300">Home</a>
          <a href="/bookings" class="hover:underline hover:text-blue-300 transition-colors duration-300">My Bookings</a>
        </div>
      </div>
    </nav>
  
    <main class="max-w-6xl mx-auto p-4">
      <h1 class="text-4xl font-bold mb-6 text-gray-800 animate-fade-in">Your Bookings</h1>
  
      {#if $bookings.length === 0}
        <p class="text-gray-500 animate-fade-in">
          You have no bookings yet.
          <a href="/" class="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-300">
            Book a package now!
          </a>
        </p>
      {:else}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each bookingDetails as { booking, package: pkg }}
            {#if pkg}
              <div
                class="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 animate-fade-in"
                style="animation-delay: {(bookingDetails.indexOf({ booking, package: pkg }) * 100)}ms;"
              >
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  class="w-full h-40 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300"
                />
                <h2 class="text-xl font-semibold text-gray-800">{pkg.name}</h2>
                <p><strong class="text-gray-700">Destination:</strong> <span class="text-gray-600">{pkg.destination}</span></p>
                <p><strong class="text-gray-700">Price:</strong> <span class="text-green-600 font-medium">${pkg.price}</span></p>
                <p><strong class="text-gray-700">Booked by:</strong> <span class="text-gray-600">{booking.userName}</span></p>
                <p><strong class="text-gray-700">Email:</strong> <span class="text-gray-600">{booking.email}</span></p>
                <p><strong class="text-gray-700">Travelers:</strong> <span class="text-gray-600">{booking.travelers}</span></p>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </main>
  </div>