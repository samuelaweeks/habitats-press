import { writable } from "svelte/store";

export const isHovering = writable({
  isHovering: false,
  text: "",
});
