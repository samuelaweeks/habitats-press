<script>
  import FilterTag from "./FilterTag.svelte";
  import { fade, fly } from "svelte/transition";

  // Props
  export let tags = [];
  export let selectedTags = [];
  export let filteredCount = 0;
  export let totalProjects = 0;

  // Events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // State
  let searchQuery = "";
  let isSearchFocused = false;
  let focusedIndex = -1;

  // Filter tags based on search query
  $: filteredTags = searchQuery
    ? tags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  // Get tag counts
  $: tagCounts = new Map(
    tags.map((tag) => [
      tag,
      totalProjects.filter((project) =>
        project.tags?.some((t) => t.name === tag),
      ).length,
    ]),
  );

  function selectTag(tag) {
    dispatch("tagSelect", tag);
    searchQuery = "";
    focusedIndex = -1;
  }

  // Handle keyboard navigation
  function handleKeydown(event) {
    if (!isSearchFocused || filteredTags.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusedIndex = (focusedIndex + 1) % filteredTags.length;
        break;
      case "ArrowUp":
        event.preventDefault();
        focusedIndex =
          (focusedIndex - 1 + filteredTags.length) % filteredTags.length;
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0) {
          selectTag(filteredTags[focusedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        isSearchFocused = false;
        searchQuery = "";
        focusedIndex = -1;
        break;
    }
  }

  // Reset focused index when search changes
  $: if (searchQuery) {
    focusedIndex = -1;
  }

  // Properly format the projects count text
  $: projectsCountText =
    filteredCount === 1 ? "1 project found" : `${filteredCount} projects found`;
</script>

<nav class="z-5 flex flex-col items-center" aria-label="Project filters">
  <!-- Search input -->
  <div class="relative w-full max-w-md">
    <input
      type="text"
      bind:value={searchQuery}
      on:focus={() => (isSearchFocused = true)}
      on:blur={() => {
        setTimeout(() => {
          isSearchFocused = false;
          searchQuery = "";
          focusedIndex = -1;
        }, 0);
      }}
      on:keydown={handleKeydown}
      placeholder={isSearchFocused
        ? "Start typing..."
        : `Filter ${totalProjects.length} projects`}
      class="h-8 w-full rounded bg-[#E6EAE3]/60 px-2 text-sm text-gray-500 backdrop-blur-3xl placeholder:text-gray-500 focus:outline-none"
      aria-label="Search tags"
    />

    <!-- Search results dropdown -->
    {#if isSearchFocused && searchQuery && filteredTags.length > 0}
      <div
        class="absolute top-full right-0 left-0 z-10 mt-1 overflow-y-auto rounded bg-[#E6EAE3]/60 px-1 py-1 backdrop-blur-3xl"
        transition:fade={{ duration: 0 }}
      >
        <ul class="flex flex-col gap-1" role="listbox">
          {#each filteredTags as tag, index}
            <li role="option" aria-selected={index === focusedIndex}>
              <button
                class="w-full rounded px-1 py-1 text-left text-sm hover:cursor-pointer hover:bg-[#E6EAE3]/65 {index ===
                focusedIndex
                  ? 'bg-[#80989B]/25 text-black'
                  : ''}"
                on:click={() => selectTag(tag)}
                on:mouseenter={() => (focusedIndex = index)}
              >
                {tag} ({tagCounts.get(tag)})
              </button>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>

  <!-- Selected tags -->
  <div class="flex flex-wrap justify-center gap-1">
    {#if selectedTags.length > 0}
      {#each selectedTags as tag}
        <div transition:fly={{ y: -10, duration: 200 }}>
          <FilterTag {tag} isActive={true} on:select={() => selectTag(tag)} />
        </div>
      {/each}
    {/if}
  </div>
</nav>
