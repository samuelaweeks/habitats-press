import { C as getContext, E as store_get, F as attr, G as attr_class, I as escape_html, J as unsubscribe_stores, B as pop, z as push, K as attr_style, M as ensure_array_like, N as stringify, O as head } from "../../chunks/index.js";
import "../../chunks/client.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function NavLink($$payload, $$props) {
  push();
  var $$store_subs;
  const { navLink } = $$props;
  const { href, text, isInternal } = navLink;
  const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
  const isActive = path === href;
  const isExternal = !isInternal;
  $$payload.out += `<a${attr("href", href)}${attr("target", isExternal ? "_blank" : void 0)}${attr("rel", isExternal ? "noopener noreferrer" : void 0)}${attr_class(`text-sm ${isActive ? "text-black" : "text-black/40"}`)}>${escape_html(text)}</a>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Header($$payload, $$props) {
  push();
  const { navLinks = [] } = $$props;
  $$payload.out += `<header class="fixed top-0 right-0 left-0 flex justify-between px-4 py-4 transition-all duration-300"${attr_style(`opacity: ${stringify("1")}; visibility: ${stringify("visible")}`)}><h1 class="text-2xl text-black"><a class="cursor-pointer" href="/">Samuel Weeks</a></h1> <nav class="z-5 flex items-center rounded bg-white/20 px-4 backdrop-blur-3xl"><ul class="flex gap-4">`;
  if (navLinks.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<li class="text-sm text-gray-500">No nav links found</li>`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(navLinks);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let navLink = each_array[$$index];
      $$payload.out += `<li>`;
      NavLink($$payload, { navLink });
      $$payload.out += `<!----></li>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></ul></nav></header> <div class="h-16"></div>`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  const { data, children } = $$props;
  const { navLinks } = data;
  let loaded = false;
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="preload" href="/fonts/STKBureauSerif-Book.woff2" as="font" type="font/woff2" crossorigin=""> <link rel="preload" href="/fonts/STKBureauSans-Book.woff2" as="font" type="font/woff2" crossorigin="">`;
  });
  $$payload.out += `<main${attr_class("min-h-screen bg-white opacity-0 transition-opacity duration-300 ease-in-out", void 0, { "opacity-100": loaded })}>`;
  Header($$payload, { navLinks });
  $$payload.out += `<!----> <div class="mt-32">`;
  children?.($$payload, { data });
  $$payload.out += `<!----></div></main>`;
  pop();
}
export {
  _layout as default
};
