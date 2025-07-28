<script>
  // Styles
  import "../app.css";

  // Stores
  import { renderPortableText } from "$lib/utils/portableText";
  import { onMount } from "svelte";

  // Components
  import Header from "$lib/components/Header.svelte";

  // Props using Svelte 5 syntax
  const { data, children } = $props();
  const { navLinks } = data;

  // State using Svelte 5 syntax
  let loaded = $state(false);
  onMount(() => {
    loaded = true;
  });
</script>

<svelte:head>
  <!-- Preload fonts for better performance -->
  <link
    rel="preload"
    href="/fonts/GT-America-Standard-Regular.woff2.download/GT-America-Standard-Regular.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
  <link
    rel="preload"
    href="/fonts/Items-NormalLight.woff2.download/Items-NormalLight.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />
</svelte:head>

<main
  class="min-h-screen bg-white opacity-0 transition-opacity duration-300 ease-in-out"
  class:opacity-100={loaded}
>
  <!-- Pass navLinks to the Header component -->
  <Header {navLinks} />

  <div class="pt-20">
    <!-- Render the child content using Svelte 5 syntax -->
    {@render children?.({ data })}
  </div>
</main>
