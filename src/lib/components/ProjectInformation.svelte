<script>
  // Imports
  import { PortableText } from "@portabletext/svelte";
  import { urlFor } from "$lib/sanity";
  import FilterTag from "./FilterTag.svelte";

  // Props
  export let project;

  // Events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // Formatted date
  $: formattedDate = new Date(project.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Handle tag click
  function handleTagClick(tag) {
    dispatch("tagSelect", tag);
  }
</script>

<div class="mb-4 grid grid-cols-2 gap-4">
  <div>
    <h4 class="text-sm mb-1">{project.title}</h4>
    <div class="text-xl text-balance">
      <PortableText value={project.excerpt} />
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <p class="text-sm">Date</p>
      <p class="text-sm">{formattedDate}</p>
    </div>
    <div>
      {#if project.collaborators && project.collaborators.length > 0}
        <p class="text-sm">Collaborators</p>
        <ul>
          {#each project.collaborators as collaborator}
            <li class="text-sm text-slate-400">
              {collaborator}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-sm">Personal project</p>
      {/if}
    </div>
  </div>
  <div class="flex flex-wrap gap-1">
    {#if project.tags && project.tags.length > 0}
      {#each project.tags as tag}
        <FilterTag
          tag={tag.name}
          isActive={false}
          on:select={() => handleTagClick(tag.name)}
        />
      {/each}
    {/if}
  </div>
</div>
