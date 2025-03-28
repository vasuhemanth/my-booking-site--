<script lang="ts">
  import { packages, searchResults } from '$lib/stores/stores';
  import type { TravelPackage } from '$lib/types/packages';

  console.log('packages in +page.svelte:', $packages);

  let destinationFilter = $state('');
  let priceRange = $state(2000);
  let durationFilter = $state(0);

  const filteredPackages = $derived(
    $packages.filter((pkg: TravelPackage) => {
      return (
        (destinationFilter === '' || pkg.destination.toLowerCase().includes(destinationFilter.toLowerCase())) &&
        pkg.price <= priceRange &&
        (durationFilter === 0 || pkg.duration === durationFilter)
      );
    })
  );

  $effect(() => {
    searchResults.set(filteredPackages);
  });
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
    <h1 class="text-4xl font-bold mb-6 text-gray-800 animate-fade-in">Travel Packages</h1>

    <div class="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Destination"
        bind:value={destinationFilter}
        class="border p-2 rounded-lg w-full sm:w-1/3 input-focus"
      />
      <div class="flex items-center gap-2 w-full sm:w-1/3">
        <input
          type="range"
          min="500"
          max="2000"
          step="100"
          bind:value={priceRange}
          class="w-full accent-blue-500"
        />
        <span class="text-gray-600">Max: ${priceRange}</span>
      </div>
      <select bind:value={durationFilter} class="border p-2 rounded-lg w-full sm:w-1/3 input-focus">
        <option value={0}>Any Duration</option>
        <option value={5}>5 Days</option>
        <option value={7}>7 Days</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each $searchResults as pkg}
        <a
          href={`/package/${pkg.id}`}
          class="border p-4 rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 animate-fade-in"
          style="animation-delay: {($searchResults.indexOf(pkg) * 100)}ms;"
        >
          <img
            src={pkg.image}
            alt={pkg.name}
            class="w-full h-40 object-cover rounded-lg mb-4 transform hover:scale-105 transition-transform duration-300"
          />
          <h2 class="text-xl font-semibold text-gray-800">{pkg.name}</h2>
          <p class="text-gray-600">{pkg.destination}</p>
          <p class="text-green-600 font-medium">${pkg.price}</p>
        </a>
      {/each}
    </div>
  </main>
</div>