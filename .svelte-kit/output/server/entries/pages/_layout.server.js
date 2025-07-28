import { g as getNavLinks } from "../../chunks/sanity.js";
async function load() {
  try {
    const navLinks = await getNavLinks();
    return {
      navLinks: navLinks || []
    };
  } catch (error) {
    console.error("Error in layout.server.js load function:", error);
    if (error.response) {
      console.error("Sanity API Response:", await error.response.text());
    }
    return {
      navLinks: []
    };
  }
}
export {
  load
};
