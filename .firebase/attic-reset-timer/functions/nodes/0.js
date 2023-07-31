

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.47c9cbee.js","_app/immutable/chunks/scheduler.19f0db05.js","_app/immutable/chunks/index.55d99e41.js"];
export const stylesheets = [];
export const fonts = [];
