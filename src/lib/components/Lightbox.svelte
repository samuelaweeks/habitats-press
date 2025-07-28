<script>
  // Imports
  import { onMount } from "svelte";
  import { urlFor } from "$lib/sanity";

  // Props
  export let images = [];
  export let currentIndex = 0;
  export let onClose;

  // Next image
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Previous image
  function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  // Handle keydown
  function handleKeydown(event) {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") previousImage();
  }

  // Add event listener
  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });
</script>

<div
  class="items-center justify-center backdrop-blur-3xl cursor-pointer flex h-full w-full fixed top-0 bottom-0 left-0 right-0 z-5"
  on:click={onClose}
  on:keydown={(e) => {
    if (e.key === "Escape") onClose();
  }}
  role="button"
  aria-label="Close gallery"
  tabindex="0"
>
  <div
    class="flex h-9/10 w-9/10 justify-center object-contain"
    on:click|stopPropagation
    on:keydown={(e) => {
      if (e.key === "Escape") onClose();
    }}
    role="button"
    tabindex="0"
    aria-label="Gallery content"
  >
    <button class="fixed top-4 right-4 z-10 bg-black text-white text-xl rounded-full h-8 w-8" on:click={onClose} aria-label="Close gallery"
      >×</button
    >
    <button
      class="nav-button prev"
      on:click={previousImage}
      aria-label="Previous image">←</button
    >
    <button class="nav-button next" on:click={nextImage} aria-label="Next image"
      >→</button
    >
    <img
      src={urlFor(images[currentIndex])
        .width(1600)
        .quality(80)
        .format("webp")
        .url()}
      alt={images[currentIndex].alt}
      loading="lazy"
    />
  </div>
</div>

<style>

  .nav-button {
    background: none;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 2rem;
    padding: 1rem;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
  }

  .prev {
    left: 20px;
  }

  .next {
    right: 20px;
  }

  @media (max-width: 768px) {
    .nav-button {
      font-size: 1.5rem;
      padding: 0.5rem;
    }

    .prev {
      left: 10px;
    }

    .next {
      right: 10px;
    }
  }
</style>
