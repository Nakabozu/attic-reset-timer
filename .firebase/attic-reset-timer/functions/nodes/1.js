

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0b5d6cd0.js","_app/immutable/chunks/scheduler.19f0db05.js","_app/immutable/chunks/index.55d99e41.js","_app/immutable/chunks/singletons.a222445e.js"];
export const stylesheets = [];
export const fonts = [];
