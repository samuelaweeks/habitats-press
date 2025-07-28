<script>
  // Props using Svelte 5 syntax
  const { navLink } = $props();
  const { href, text, isInternal } = navLink;

  // Active path using Svelte 5 syntax
  import { page } from "$app/stores";
  const path = $derived($page.url.pathname);
  const isActive = $derived(path === href);

  // Determine if link is external (this is now redundant since we have isInternal)
  const isExternal = $derived(!isInternal);
</script>

<a
  {href}
  target={isExternal ? "_blank" : undefined}
  rel={isExternal ? "noopener noreferrer" : undefined}
  class={`text-sm ${isActive ? "text-black" : "text-black/40"}`}
>
  {text}
</a>
