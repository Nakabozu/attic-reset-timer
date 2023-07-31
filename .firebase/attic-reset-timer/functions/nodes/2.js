

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.adc740a0.js","_app/immutable/chunks/scheduler.19f0db05.js","_app/immutable/chunks/index.55d99e41.js"];
export const stylesheets = ["_app/immutable/assets/2.b87cdf2f.css"];
export const fonts = [];
