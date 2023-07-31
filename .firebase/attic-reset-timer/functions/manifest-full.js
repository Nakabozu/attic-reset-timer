export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["AtticDweller.png","Car Door Open chime.mp3","Double D Ehem.mp3","Ed, Edd, n Eddy Intro.mp3","Eddy says Get It On.mp3","favicon.png","ghost_shop.gif","icons8-audio-64.png","icons8-no-audio-24.png","icons8-notification.svg","La cucaracha.mp3","Pop the cork.mp3","Several Dings.mp3","Toaster Ding.mp3","Twinkle Toes.mp3","Typewriter.mp3","Yelling Man why he so mad.mp3","Yodel.mp3"]),
	mimeTypes: {".png":"image/png",".mp3":"audio/mpeg",".gif":"image/gif",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.60a8301e.js","app":"_app/immutable/entry/app.35e314a9.js","imports":["_app/immutable/entry/start.60a8301e.js","_app/immutable/chunks/scheduler.19f0db05.js","_app/immutable/chunks/singletons.780e67e0.js","_app/immutable/entry/app.35e314a9.js","_app/immutable/chunks/scheduler.19f0db05.js","_app/immutable/chunks/index.55d99e41.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
