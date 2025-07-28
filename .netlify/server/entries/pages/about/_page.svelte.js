import { M as ensure_array_like, I as escape_html, F as attr, R as bind_props, B as pop, z as push } from "../../../chunks/index.js";
import { u as urlFor } from "../../../chunks/sanity.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function renderPortableText(blocks) {
  if (!blocks) return "";
  try {
    return blocks.map((block) => {
      const { style = "normal", children = [], markDefs = [] } = block;
      const text = children.map((child) => {
        let content = child.text;
        if (child.marks && child.marks.length > 0) {
          child.marks.forEach((markKey) => {
            const linkDef = markDefs.find((def) => def._key === markKey);
            if (linkDef && linkDef._type === "link") {
              content = `<a href="${linkDef.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;
            } else {
              switch (markKey) {
                case "strong":
                  content = `<strong>${content}</strong>`;
                  break;
                case "em":
                  content = `<em>${content}</em>`;
                  break;
              }
            }
          });
        }
        return content;
      }).join("");
      switch (style) {
        case "h1":
          return `<h1>${text}</h1>`;
        case "h2":
          return `<h2>${text}</h2>`;
        case "h3":
          return `<h3>${text}</h3>`;
        case "h4":
          return `<h4>${text}</h4>`;
        default:
          return `<p>${text}</p>`;
      }
    }).join("");
  } catch (error) {
    console.error("Error rendering portable text:", error);
    return "";
  }
}
function _page($$payload, $$props) {
  push();
  let aboutContent, primaryTags, collaborators, credits, portrait;
  let data = $$props["data"];
  aboutContent = data?.appSettings?.aboutPage?.intro || null;
  primaryTags = data?.primaryTags || [];
  collaborators = data?.appSettings?.aboutPage?.collaborators || [];
  credits = data?.appSettings?.aboutPage?.credits || null;
  portrait = data?.appSettings?.aboutPage?.portrait;
  $$payload.out += `<div class="px-4"><div class="text-2xl">`;
  if (aboutContent) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${html(renderPortableText(aboutContent))}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="about-columns svelte-1n9d6fp"><div class="about-column svelte-1n9d6fp"><h3 class="text-2xl svelte-1n9d6fp">Services</h3> <ul class="services">`;
  if (primaryTags && primaryTags.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(primaryTags);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tag = each_array[$$index];
      $$payload.out += `<li class="service svelte-1n9d6fp"><p class="svelte-1n9d6fp">${escape_html(tag.name)}</p></li>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul></div> <div class="about-column svelte-1n9d6fp"><h3 class="text-2xl svelte-1n9d6fp">Collaborators</h3> <ul class="collaborators">`;
  if (collaborators && collaborators.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(collaborators);
    $$payload.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let collaborator = each_array_1[$$index_1];
      $$payload.out += `<li class="collaborator svelte-1n9d6fp"><p class="svelte-1n9d6fp">${escape_html(collaborator)}</p></li>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul></div> <div class="about-column svelte-1n9d6fp"><h3 class="text-2xl svelte-1n9d6fp">Credits</h3> <div class="credits svelte-1n9d6fp">`;
  if (credits) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${html(renderPortableText(credits))}`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div> <div class="about-column svelte-1n9d6fp">`;
  if (portrait) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="portrait"><img${attr("src", urlFor(portrait).width(400).quality(80).format("webp").url())} alt="Samuel Weeks" loading="lazy"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
