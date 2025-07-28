import { c as client, a as getPrimaryTags } from "../../../chunks/sanity.js";
async function load() {
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
    getPrimaryTags()
  ]);
  return {
    appSettings,
    primaryTags
  };
}
export {
  load
};
