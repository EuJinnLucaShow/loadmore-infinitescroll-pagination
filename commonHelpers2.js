import{l as v,A as w}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i}from"./assets/vendor-a94593f8.js";const O=document.getElementById("search-button"),a=document.querySelector(".gallery"),p=document.querySelector("#search-bar"),r=new w;let o=0,c=!0;O.addEventListener("click",h);p.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),h()),c=!0});function h(){const e=p.value.trim();if(a.innerHTML="",r.query=e,r.resetPage(),e===""){C("Please, fill the main field");return}o=0,m()}async function m(){try{const e=await r.fetchGallery(),{hits:n,totalHits:t}=e;if(!n.length){f("Sorry, there are no images matching your search query. Please try again.");return}c&&o<t&&($(`Hooray! We found ${t} images !!!`),c=!1),k(n),o+=n.length;const s=a.lastElementChild;s&&l.observe(s),o>=t&&(l.disconnect(),I("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),f("An error occurred while fetching the gallery.")}}function k(e){const n=e.map(({webformatURL:t,largeImageURL:s,tags:g,likes:d,views:y,comments:b,downloads:E})=>`
      <div class="photo-card">
        <a href="${s}">
          <img class="photo-img" src="${t}" alt="${g}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${d}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${y}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${b}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${E}</span></p>
        </div>
      </div>`).join("");a.insertAdjacentHTML("beforeend",n),v.refresh()}const S={root:null,rootMargin:"0px",threshold:.5},l=new IntersectionObserver(_,S);function _(e,n){e.forEach(t=>{t.isIntersecting&&(r.incrementPage(),m())})}const u=a.firstElementChild;u&&l.observe(u);function C(e){i.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function f(e){i.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function $(e){i.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function I(e){i.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers2.js.map
