// GitHub Pages用: COOP/COEPヘッダーを付けて crossOriginIsolated を有効にする（複数スレッドWASMに必要）
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.cache==='only-if-cached'&&r.mode!=='same-origin')return;
const q=r.mode==='no-cors'?new Request(r,{credentials:'omit'}):r;
e.respondWith(fetch(q).then(res=>{if(res.status===0)return res;const h=new Headers(res.headers);
h.set('Cross-Origin-Embedder-Policy','credentialless');h.set('Cross-Origin-Opener-Policy','same-origin');
return new Response(res.body,{status:res.status,statusText:res.statusText,headers:h})}).catch(x=>{console.error(x);return Response.error()}))});
