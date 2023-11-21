import{a as r,l as E}from"./assets/lightbox-dad09c9e.js";/* empty css                     */import{i as a}from"./assets/vendor-a94593f8.js";const O=document.getElementById("search-button"),c=document.querySelector(".gallery"),h=document.querySelector("#search-bar");let o=0,i=!0,l="";const k={root:null,rootMargin:"0px",threshold:.5},u=new IntersectionObserver(_,k);O.addEventListener("click",function(e){e.preventDefault(),m(),i=!0});h.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),m()),i=!0});async function m(){const e=h.value.trim();if(r.setQuery(e),e===""){f("Please, fill the main field");return}if(e===l){f("Please, modify or enter a new search field.");return}c.innerHTML="",r.resetPage(),l=e,o=0,await g()}async function g(){try{const e=await r.fetchGallery(),{hits:n,totalHits:t}=e;if(!n.length){p("Sorry, there are no images matching your search query. Please try again.");return}i&&o<t&&($(`Hooray! We found ${t} images !!!`),i=!1),S(n),o+=n.length;const s=c.lastElementChild;s&&u.observe(s),o>=t&&(u.disconnect(),C("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),p("An error occurred while fetching the gallery.")}}function S(e){const n=e.map(({webformatURL:t,largeImageURL:s,tags:d,likes:y,views:b,comments:v,downloads:w})=>`
      <div class="photo-card">
        <a href="${s}">
          <img class="photo-img" src="${t}" alt="${d}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${y}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${b}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${v}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${w}</span></p>
        </div>
      </div>`).join("");c.insertAdjacentHTML("beforeend",n),E.refresh()}function _(e,n){e.forEach(t=>{t.isIntersecting&&(r.incrementPage(),g())})}function f(e){a.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:4e3,closeOnEscape:!0,closeOnClick:!0})}function p(e){a.error({title:"Error",message:e,position:"topRight",color:"red",timeout:3e3,closeOnEscape:!0,closeOnClick:!0})}function $(e){a.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function C(e){a.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:3e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers2.js.map
