<script>
  // Props
  export let tag;
  export let isActive = false;

  // Events
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  // State
  let isHovered = false;

  // Handle click
  function handleClick() {
    dispatch("select", tag);
  }
</script>

<button
  class="group relative cursor-pointer px-2 py-0.5 text-xs text-inherit backdrop-blur-3xl transition-all duration-300 ease-in-out
    {isActive
    ? 'rounded bg-[#C8D5BB] text-black'
    : 'rounded bg-[#C8D5BB] text-black hover:bg-[#C8D5BB]/40 hover:text-black'}"
  on:click={handleClick}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  on:keydown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
  aria-selected={isActive}
  aria-label={`Filter by ${tag}`}
  role="tab"
>
  <span class="transition-opacity duration-200" class:opacity-0={isHovered}>
    {tag}
  </span>
  {#if isHovered}
    <span class="absolute inset-0 flex items-center justify-center text-black">
      {isActive ? "×" : "+"}
    </span>
  {/if}
</button>
