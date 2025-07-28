import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
const client = createClient({
  projectId: "owl4m3d9",
  dataset: "production",
  apiVersion: "2024-03-22",
  useCdn: true
});
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}
async function getPrimaryTags() {
  return await client.fetch(`*[_type == "tags" && isPrimary == true] | order(order asc, name asc) {
    name,
    slug
  }`);
}
async function getNavLinks() {
  try {
    const result = await client.fetch(`*[_type == "navLink"] | order(orderRank) {
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
export {
  getPrimaryTags as a,
  client as c,
  getNavLinks as g,
  urlFor as u
};
