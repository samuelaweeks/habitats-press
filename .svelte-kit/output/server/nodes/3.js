import * as server from '../entries/pages/about/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/about/+page.server.js";
export const imports = ["_app/immutable/nodes/3.CX_fU79I.js","_app/immutable/chunks/DDgv-81v.js","_app/immutable/chunks/CYEf1Ylp.js","_app/immutable/chunks/CfeyyWgh.js","_app/immutable/chunks/BKaudtaW.js","_app/immutable/chunks/CJ7GsXyi.js","_app/immutable/chunks/CB-ywmT0.js","_app/immutable/chunks/DBeyxx2k.js","_app/immutable/chunks/CS4I8XOw.js","_app/immutable/chunks/BZde33tx.js","_app/immutable/chunks/DVAfeb8i.js","_app/immutable/chunks/Dp1pzeXC.js"];
export const stylesheets = ["_app/immutable/assets/3.DxGczvF8.css"];
export const fonts = [];
