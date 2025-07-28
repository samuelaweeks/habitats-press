import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "owl4m3d9",
  dataset: "production",
  apiVersion: "2024-03-22",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export async function getHomePage() {
  return await client.fetch(`*[_type == "homePage"][0]{
    intro
  }`);
}

export async function getAboutPage() {
  return await client.fetch(`*[_type == "aboutPage"][0]{
    intro,
    portrait,
    collaborators,
    credits[] {
      ...,
      markDefs[] {
        ...,
        _type,
        href
      }
    }
  }`);
}

export async function getPrimaryTags() {
  return await client.fetch(`*[_type == "tags" && isPrimary == true] | order(order asc, name asc) {
    name,
    slug
  }`);
}

export async function getProjects() {
  try {
    const projects =
      await client.fetch(`*[_type == "projects"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      collaborators,
      "images": images[] {
        "asset": asset->,
        caption,
        alt,
        size
      },
      "tags": coalesce(tags, [])[]-> {
        name
      },
      publishedAt
    }`);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    console.error("Error details:", error);
    if (error.response) {
      console.error("Response:", await error.response.text());
    }
    throw error;
  }
}

export async function getNavLinks() {
  try {
    const result =
      await client.fetch(`*[_type == "navLink"] | order(orderRank) {
      _id,
      _type,
      href,
      text,
      isInternal,
      orderRank
    }`);

    return result;
  } catch (error) {
    console.error("Error in getNavLinks:", error);
    if (error.response) {
      const responseText = await error.response.text();
      console.error("Sanity API Response:", responseText);
    }
    return [];
  }
}
