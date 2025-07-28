<script>
  // Imports
  import { urlFor } from "$lib/sanity";

  // Props
  export let project;
  export let openLightbox;

  // Get image URL
  function getImageUrl(image) {
    if (!image) return "";
    const baseWidth = image.size ? 1200 : 600;
    return urlFor(image).width(baseWidth).quality(70).format("webp").url();
  }
</script>

<div class="grid grid-cols-12 items-start justify-items-center gap-2">
  {#each project.images as image, index}
    <div
      class="group col-span-2 flex w-full cursor-pointer flex-col overflow-hidden {image.size
        ? 'col-span-3'
        : 'col-span-2'}"
      on:click={() => openLightbox(project, index)}
      on:keydown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openLightbox(project, index);
        }
      }}
      role="button"
      tabindex="0"
    >
      <img
        src={getImageUrl(image)}
        alt={image.alt || project.title}
        loading="lazy"
        class="w-full transition-all duration-300 ease-in-out hover:rounded-xl"
      />
      {#if image.caption}
        <p class="invisible mt-2 text-sm text-slate-400 group-hover:visible">
          {image.caption}
        </p>
      {/if}
    </div>
  {/each}
</div>
