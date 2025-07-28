<script>
  // Stores
  import { onMount } from "svelte";

  // Components
  import NavLink from "./NavLink.svelte";

  // Props using Svelte 5 syntax
  const { navLinks = [] } = $props();

  // Track if component is mounted
  let mounted = false;
  let lastScrollY = 0;
  let isVisible = $state(true);

  onMount(() => {
    mounted = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isVisible = currentScrollY < lastScrollY || currentScrollY < 10;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<!-- Header -->
<header
  class="fixed top-0 right-0 left-0 bg-white flex justify-center px-4 py-4 transition-all duration-300 z-50"
  style="opacity: {isVisible ? '1' : '0'}; visibility: {isVisible
    ? 'visible'
    : 'hidden'}"
>
  <!-- Centered Logo/Name -->
  <h1 class="text-4xl text-black">
    <a class="cursor-pointer" href="/">Habitats Press</a>
  </h1>
  
  <!-- Commented out nav for future use -->
  <!--
  <nav class="z-5 flex items-center rounded bg-white/20 px-4 backdrop-blur-3xl">
    <ul class="flex gap-4">
      {#if navLinks.length === 0}
        <li class="text-sm text-gray-500">No nav links found</li>
      {:else}
        {#each navLinks as navLink}
          <li>
            <NavLink {navLink} />
          </li>
        {/each}
      {/if}
    </ul>
  </nav>
  -->
</header>

<!-- Removed spacer - layout will handle header spacing -->
