// Commented out for future use - Sanity data loading
// import { getHomePage, getProjects } from "$lib/sanity";

// Newsletter signup page - no server-side data loading needed
export async function load() {
  // Return empty object since we're not fetching any data for the newsletter signup
  return {};
}

// Commented out for future use - Original Sanity data loading function
/*
export async function load() {
  try {
    const [homePage, projects] = await Promise.all([
      // Load home page
      getHomePage(),
      // Load projects
      getProjects(),
    ]);

    // Extract unique tags from projects
    const tags = [
      ...new Set(
        projects.flatMap((project) => {
          if (!project.tags) {
            console.warn("Project missing tags:", project._id);
            return [];
          }
          return project.tags
            .map((tag) => {
              if (!tag?.name) {
                console.warn("Tag missing name:", tag);
                return null;
              }
              return tag.name;
            })
            .filter(Boolean);
        }),
      ),
    ];

    // Return data
    return {
      homePage,
      projects,
      tags,
    };
  } catch (error) {
    console.error("Error in page.server.js load function:", error);
    return {
      homePage: null,
      projects: [],
      tags: [],
      error: error.message,
    };
  }
}
*/
