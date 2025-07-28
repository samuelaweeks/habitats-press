<script>
  import { fade } from "svelte/transition";
  import { urlFor } from "$lib/sanity";
  import { renderPortableText } from "$lib/utils/portableText";
  /** @type {import('./$types').PageData} */
  export let data;

  $: aboutContent = data?.appSettings?.aboutPage?.intro || null;
  $: primaryTags = data?.primaryTags || [];
  $: collaborators = data?.appSettings?.aboutPage?.collaborators || [];
  $: credits = data?.appSettings?.aboutPage?.credits || null;
  $: portrait = data?.appSettings?.aboutPage?.portrait;
</script>

<div class="px-4" in:fade={{ duration: 300, delay: 300 }}>
  <div class="text-2xl">
    {#if aboutContent}
      {@html renderPortableText(aboutContent)}
    {/if}
  </div>
  <div class="about-columns">
    <div class="about-column">
      <h3 class="text-2xl">Services</h3>
      <ul class="services">
        {#if primaryTags && primaryTags.length > 0}
          {#each primaryTags as tag}
            <li class="service">
              <p>{tag.name}</p>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
    <div class="about-column">
      <h3 class="text-2xl">Collaborators</h3>
      <ul class="collaborators">
        {#if collaborators && collaborators.length > 0}
          {#each collaborators as collaborator}
            <li class="collaborator">
              <p>{collaborator}</p>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
    <div class="about-column">
      <h3 class="text-2xl">Credits</h3>
      <div class="credits">
        {#if credits}
          {@html renderPortableText(credits)}
        {/if}
      </div>
    </div>
    <div class="about-column">
      {#if portrait}
        <div class="portrait">
          <img
            src={urlFor(portrait).width(400).quality(80).format("webp").url()}
            alt="Samuel Weeks"
            loading="lazy"
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .about-columns {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(12, 1fr);
    margin-bottom: 2rem;
  }

  .about-column {
    grid-column: span 3;
  }

  .about-column h3 {
    margin-bottom: 0.5rem;
  }

  .service > p,
  .collaborator > p {
    color: rgb(var(--color-dark-gray));
    white-space: nowrap;
  }

  .credits :global(p:last-child) {
    margin-bottom: 0;
  }

  .credits :global(p) {
    color: rgb(var(--color-dark-gray));
    text-wrap: balance;
  }

  .credits :global(a) {
    color: inherit;
    text-decoration: underline;
  }
</style>
