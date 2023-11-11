import{l as O,A as k}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i as a}from"./assets/vendor-a94593f8.js";const S=document.getElementById("search-button"),c=document.querySelector(".gallery"),m=document.querySelector("#search-bar"),r=new k;let o=0,i=!0,u="";S.addEventListener("click",function(e){e.preventDefault(),g(),i=!0});m.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),g()),i=!0});function g(){const e=m.value.trim();if(r.query=e,e===""){p("Please, fill the main field");return}if(e===u){p("Please, enter new query.");return}c.innerHTML="",r.resetPage(),u=e,o=0,d()}async function d(){try{const e=await r.fetchGallery(),{hits:n,totalHits:t}=e;if(!n.length){h("Sorry, there are no images matching your search query. Please try again.");return}i&&o<t&&(I(`Hooray! We found ${t} images !!!`),i=!1),_(n),o+=n.length;const s=c.lastElementChild;s&&l.observe(s),o>=t&&(l.disconnect(),T("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),h("An error occurred while fetching the gallery.")}}function _(e){const n=e.map(({webformatURL:t,largeImageURL:s,tags:y,likes:b,views:v,comments:E,downloads:w})=>`
      <div class="photo-card">
        <a href="${s}">
          <img class="photo-img" src="${t}" alt="${y}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${b}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${v}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${E}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${w}</span></p>
        </div>
      </div>`).join("");c.insertAdjacentHTML("beforeend",n),O.refresh()}const C={root:null,rootMargin:"0px",threshold:.5},l=new IntersectionObserver($,C);function $(e,n){e.forEach(t=>{t.isIntersecting&&(r.incrementPage(),d())})}const f=c.firstElementChild;f&&l.observe(f);function p(e){a.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function h(e){a.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function I(e){a.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function T(e){a.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers2.js.map
