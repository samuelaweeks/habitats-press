// Commented out for newsletter signup page - no nav links needed
// import { getNavLinks } from "$lib/sanity";

// Simple layout load - no nav links for now
export async function load() {
  return {
    navLinks: [],
  };
}

// Commented out for future use - Original nav links loading
/*
export async function load() {
  try {
    const navLinks = await getNavLinks();

    // Return data
    return {
      navLinks: navLinks || [],
    };
  } catch (error) {
    console.error("Error in layout.server.js load function:", error);
    if (error.response) {
      console.error("Sanity API Response:", await error.response.text());
    }
    return {
      navLinks: [],
    };
  }
}
*/
