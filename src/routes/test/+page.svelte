<script lang="ts">
    import { packages } from '$lib/stores/stores';
    import type { TravelPackage } from '$lib/types/packages';
  
    console.log('Test route packages:', $packages);
  </script>
  
  <main class="max-w-4xl mx-auto p-4">
    <h1>Test Page</h1>
    <p>Packages:</p>
    <ul>
      {#each $packages as pkg}
        <li>{pkg.id}: {pkg.name}</li>
      {/each}
    </ul>
    <a href="/" class="text-blue-500 hover:underline">Back to Home</a>
  </main>