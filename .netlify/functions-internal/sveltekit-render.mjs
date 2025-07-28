import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","._.DS_Store","._favicon.svg","._fonts","favicon.svg","fonts/._GT-America-Standard-Regular.woff2.download","fonts/._Items-NormalLight.woff2.download","fonts/._ItemsText-Book.woff2","fonts/._ItemsText-BookItalic.woff2","fonts/._ItemsText-Monospaced.woff2","fonts/GT-America-Standard-Regular.woff2.download/._GT-America-Standard-Regular.woff2","fonts/GT-America-Standard-Regular.woff2.download/GT-America-Standard-Regular.woff2","fonts/Items-NormalLight.woff2.download/._Items-NormalLight.woff2","fonts/Items-NormalLight.woff2.download/Items-NormalLight.woff2","fonts/ItemsText-Book.woff2","fonts/ItemsText-BookItalic.woff2","fonts/ItemsText-Monospaced.woff2"]),
	mimeTypes: {".svg":"image/svg+xml",".woff2":"font/woff2"},
	_: {
		client: {start:"_app/immutable/entry/start.DjktA1Pk.js",app:"_app/immutable/entry/app.rxyKUF5z.js",imports:["_app/immutable/entry/start.DjktA1Pk.js","_app/immutable/chunks/zXcmi2cA.js","_app/immutable/chunks/CfeyyWgh.js","_app/immutable/chunks/DVAfeb8i.js","_app/immutable/chunks/DDV6q7a3.js","_app/immutable/entry/app.rxyKUF5z.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/CfeyyWgh.js","_app/immutable/chunks/CJ7GsXyi.js","_app/immutable/chunks/CYEf1Ylp.js","_app/immutable/chunks/CB-ywmT0.js","_app/immutable/chunks/BZde33tx.js","_app/immutable/chunks/DVAfeb8i.js","_app/immutable/chunks/DDV6q7a3.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
