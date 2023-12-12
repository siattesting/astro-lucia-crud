const y=n=>history.state&&history.replaceState(n,""),b=!!document.startViewTransition,p=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),A=n=>document.dispatchEvent(new Event(n)),S=()=>A("astro:page-load"),u="data-astro-transition-persist";let d=0;history.state?(d=history.state.index,scrollTo({left:0,top:history.state.scrollY})):p()&&history.replaceState({index:d,scrollY},"");const v=(n,e)=>{let t=!1,r=!1;return(...a)=>{if(t){r=!0;return}n(...a),t=!0,setTimeout(()=>{r&&(r=!1,n(...a)),t=!1},e)}};async function x(n){const e=await fetch(n),t=await e.text();return{ok:e.ok,html:t}}function T(){const n=document.querySelector('[name="astro-view-transitions-fallback"]');return n?n.getAttribute("content"):"animate"}function k(){for(const n of document.scripts)n.dataset.astroExec=""}function L(){let n=Promise.resolve();for(const e of Array.from(document.scripts)){if(e.dataset.astroExec==="")continue;const t=document.createElement("script");t.innerHTML=e.innerHTML;for(const r of e.attributes){if(r.name==="src"){const a=new Promise(h=>{t.onload=h});n=n.then(()=>a)}t.setAttribute(r.name,r.value)}t.dataset.astroExec="",e.replaceWith(t)}return n}function R(n){const e=n.effect;return!e||!(e instanceof KeyframeEffect)||!e.target?!1:window.getComputedStyle(e.target,e.pseudoElement).animationIterationCount==="infinite"}const P=new DOMParser;async function E(n,e,t,r){const a=s=>{const l=s.getAttribute(u),f=l&&n.head.querySelector(`[${u}="${l}"]`);if(f)return f;if(s.matches("link[rel=stylesheet]")){const i=s.getAttribute("href");return n.head.querySelector(`link[rel=stylesheet][href="${i}"]`)}if(s.tagName==="SCRIPT"){let i=s;for(const o of n.scripts)if(i.textContent&&i.textContent===o.textContent||i.type===o.type&&i.src===o.src)return o}return null},h=()=>{n.querySelectorAll("head noscript").forEach(o=>o.remove());const s=document.documentElement,l=[...s.attributes].filter(({name:o})=>(s.removeAttribute(o),o.startsWith("data-astro-")));[...n.documentElement.attributes,...l].forEach(({name:o,value:c})=>s.setAttribute(o,c));for(const o of Array.from(document.head.children)){const c=a(o);c?c.remove():o.remove()}document.head.append(...n.head.children);const f=document.body;document.body.replaceWith(n.body);for(const o of f.querySelectorAll(`[${u}]`)){const c=o.getAttribute(u),w=document.querySelector(`[${u}="${c}"]`);w&&w.replaceWith(o)}scrollTo({left:0,top:0,behavior:"instant"});let i=0;if(!t&&e.hash){const o=decodeURIComponent(e.hash.slice(1)),c=document.getElementById(o);c&&(i=c.offsetTop)&&c.scrollIntoView()}else t&&t.scrollY!==0&&scrollTo(0,t.scrollY);!t&&history.pushState({index:++d,scrollY:i},"",e.href),A("astro:after-swap")},m=[];for(const s of n.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${u}="${s.getAttribute(u)}"], link[rel=stylesheet]`)){const l=document.createElement("link");l.setAttribute("rel","preload"),l.setAttribute("as","style"),l.setAttribute("href",s.getAttribute("href")),m.push(new Promise(f=>{["load","error"].forEach(i=>l.addEventListener(i,f)),document.head.append(l)}))}if(m.length&&await Promise.all(m),r==="animate"){const s=document.getAnimations();document.documentElement.dataset.astroTransitionFallback="old";const l=document.getAnimations().filter(o=>!s.includes(o)&&!R(o)),f=Promise.all(l.map(o=>o.finished)),i=()=>{h(),document.documentElement.dataset.astroTransitionFallback="new"};await f,i()}else h()}async function g(n,e,t){let r;const a=e.href,{html:h,ok:m}=await x(a);if(!m){location.href=a;return}const s=P.parseFromString(h,"text/html");if(!s.querySelector('[name="astro-view-transitions-enabled"]')){location.href=a;return}document.documentElement.dataset.astroTransition=n,b?r=document.startViewTransition(()=>E(s,e,t)).finished:r=E(s,e,t,T());try{await r}finally{await L(),k(),S()}}function q(n){if(document.querySelector(`link[rel=prefetch][href="${n}"]`))return;if(navigator.connection){let t=navigator.connection;if(t.saveData||/(2|3)g/.test(t.effectiveType||""))return}let e=document.createElement("link");e.setAttribute("rel","prefetch"),e.setAttribute("href",n),document.head.append(e)}if(b||T()!=="none"){k(),document.addEventListener("click",e=>{let t=e.target;if(t instanceof Element&&t.tagName!=="A"&&(t=t.closest("a")),!(!t||!(t instanceof HTMLAnchorElement)||t.dataset.astroReload!==void 0||t.hasAttribute("download")||!t.href||t.target&&t.target!=="_self"||t.origin!==location.origin||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.defaultPrevented||!p())){if(location.pathname===t.pathname&&location.search===t.search){if(t.hash)return;if(e.preventDefault(),y({...history.state,scrollY}),scrollTo({left:0,top:0,behavior:"instant"}),location.hash){const r={index:++d,scrollY:0};history.pushState(r,"",t.href)}return}e.preventDefault(),y({index:d,scrollY}),g("forward",new URL(t.href))}}),addEventListener("popstate",e=>{if(!p()&&e.state){history.scrollRestoration&&(history.scrollRestoration="manual"),location.reload();return}if(e.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}history.scrollRestoration&&(history.scrollRestoration="manual");const t=history.state,r=t.index,a=r>d?"forward":"back";d=r,g(a,new URL(location.href),t)}),["mouseenter","touchstart","focus"].forEach(e=>{document.addEventListener(e,t=>{if(t.target instanceof HTMLAnchorElement){let r=t.target;r.origin===location.origin&&r.pathname!==location.pathname&&p()&&q(r.pathname)}},{passive:!0,capture:!0})}),addEventListener("load",S);const n=()=>{y({...history.state,scrollY})};"onscrollend"in window?addEventListener("scrollend",n):addEventListener("scroll",v(n,300))}