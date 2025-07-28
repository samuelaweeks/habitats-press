<script>
  import Newsletter from '$lib/components/Newsletter.svelte';
  
  // Commented out for future use - Sanity imports and components
  // import { PortableText } from "@portabletext/svelte";
  // import { urlFor } from "$lib/sanity";
  // import Lightbox from "$lib/components/Lightbox.svelte";
  // import { fade, fly } from "svelte/transition";
  // import Project from "$lib/components/Project.svelte";
  // import Filter from "$lib/components/Filter.svelte";

  // Commented out for future use - Props using Svelte 5 syntax
  // const { data } = $props();

  // Commented out for future use - Lightbox and project filtering functionality
  /*
  let lightboxOpen = $state(false);
  let currentProject = $state(null);
  let currentImageIndex = $state(0);

  function openLightbox(project, index) {
    currentProject = project;
    currentImageIndex = index;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
    currentProject = null;
    currentImageIndex = 0;
  }

  function getImageUrl(image, size) {
    if (!image) return "";
    return urlFor(image)
      .width(size === "large" ? 1200 : 600)
      .url();
  }

  // Default to empty array to show all projects
  let selectedTags = $state([]);

  function handleTagSelect(event) {
    const tag = event.detail;
    if (tag === "all") {
      selectedTags = [];
    } else {
      // Toggle tag selection
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter((t) => t !== tag);
      } else {
        selectedTags = [...selectedTags, tag];
      }
    }
  }

  // Function to extract tag names from a project
  function getProjectTagNames(project) {
    if (!project.tags || !Array.isArray(project.tags)) {
      return [];
    }
    return project.tags.map((tag) => tag.name);
  }

  // Filter projects based on selected tags using Svelte 5 syntax
  const filteredProjects = $derived(
    selectedTags.length === 0
      ? data.projects
      : data.projects.filter((project) => {
          const projectTagNames = getProjectTagNames(project);
          return selectedTags.some((tag) => projectTagNames.includes(tag));
        }),
  );
  */
</script>

<Newsletter />

<!-- Commented out for future use - Filter and Projects sections -->
<!--
<div class="fixed top-0 mt-4 w-full">
  <Filter
    tags={data.tags}
    {selectedTags}
    filteredCount={filteredProjects.length}
    totalProjects={data.projects}
    on:tagSelect={handleTagSelect}
  />
</div>

<section class="gap-4 px-4" role="main" aria-label="Projects" transition:fade={{ duration: 300 }}>
  <ul class="grid grid-cols-1">
    {#if filteredProjects.length === 0}
      <li role="status" aria-live="polite" transition:fade>
        No projects match the selected filter
      </li>
    {/if}
    {#each filteredProjects as project (project._id || project.id)}
      <div transition:fly={{ y: 20, duration: 300 }}>
        <Project {project} {openLightbox} on:tagSelect={handleTagSelect} />
      </div>
    {/each}
  </ul>
</section>

{#if lightboxOpen && currentProject}
  <Lightbox
    images={currentProject.images}
    currentIndex={currentImageIndex}
    onClose={closeLightbox}
  />
{/if}
-->
