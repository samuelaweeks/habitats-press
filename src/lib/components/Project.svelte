<script>
  // Imports
  import { PortableText } from "@portabletext/svelte";
  import { urlFor } from "$lib/sanity";

  // Components
  import ProjectGallery from "./ProjectGallery.svelte";
  import ProjectInformation from "./ProjectInformation.svelte";

  // Props
  export let project;
  export let openLightbox;

  // Events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleTagSelect(event) {
    dispatch("tagSelect", event.detail);
  }
</script>

<li class="mb-32 border-t border-dashed border-slate-300 pt-4">
  <ProjectInformation {project} on:tagSelect={handleTagSelect} />
  <ProjectGallery {project} {openLightbox} />
</li>
