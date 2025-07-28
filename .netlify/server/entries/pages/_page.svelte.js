import { F as attr, I as escape_html, B as pop, z as push } from "../../chunks/index.js";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com";
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "your-storefront-access-token";
createStorefrontApiClient({
  storeDomain: SHOPIFY_STORE_DOMAIN,
  apiVersion: "2024-10",
  publicAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN
});
function _page($$payload, $$props) {
  push();
  let email = "";
  let firstName = "";
  let lastName = "";
  let isLoading = false;
  $$payload.out += `<div class="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50"><div class="max-w-md w-full"><div class="relative backdrop-blur-lg bg-white/25 border border-white/20 rounded-2xl shadow-xl p-8 text-center"><h1 class="text-3xl font-bold mb-4 text-gray-900">Stay in Touch</h1> <p class="text-gray-700 mb-8">Subscribe to our newsletter for updates and exclusive content.</p> <form class="space-y-4"><div class="space-y-3"><input type="text"${attr("value", firstName)} placeholder="First Name (optional)" class="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/40 backdrop-blur-sm placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"${attr("disabled", isLoading, true)}> <input type="text"${attr("value", lastName)} placeholder="Last Name (optional)" class="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/40 backdrop-blur-sm placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"${attr("disabled", isLoading, true)}> <input type="email"${attr("value", email)} placeholder="Enter your email" required class="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/40 backdrop-blur-sm placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"${attr("disabled", isLoading, true)}></div> <button type="submit"${attr("disabled", isLoading, true)} class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg">${escape_html("Subscribe")}</button></form> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div>`;
  pop();
}
export {
  _page as default
};
