import { client } from "$lib/sanity";
import { getPrimaryTags } from "$lib/sanity";

export async function load() {
  const [appSettings, primaryTags] = await Promise.all([
    client.fetch(`
      *[_type == "app"][0] {
        aboutPage {
          intro,
          collaborators,
          credits,
          portrait
        }
      }
    `),
    getPrimaryTags(),
  ]);

  return {
    appSettings,
    primaryTags,
  };
}
