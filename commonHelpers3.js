import{a as r,l as E}from"./assets/lightbox-dad09c9e.js";/* empty css                     */import{i as a}from"./assets/vendor-a94593f8.js";const L=document.getElementById("search-button"),d=document.querySelector(".gallery"),f=document.querySelector("#search-bar"),t=document.querySelector(".btn__load-more");let o=0,i=!0,c="";L.addEventListener("click",function(e){e.preventDefault(),h(),i=!0});f.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),h()),i=!0});async function h(){const e=f.value.trim();if(r.setQuery(e),e===""){t.classList.add("is-hidden"),l("Please, fill the main field");return}if(e===c){t.classList.add("is-hidden"),l("Please, modify or enter a new search field.");return}d.innerHTML="",r.resetPage(),c=e,o=0,await p()}async function p(){try{const e=await r.fetchGallery(),{hits:s,totalHits:n}=e;if(!s.length){t.classList.add("is-hidden"),u("Sorry, there are no images matching your search query. Please try again.");return}i&&o<n&&(S(`Hooray! We found ${n} images !!!`),i=!1,t.classList.remove("is-hidden")),k(s),o+=s.length,o>=n&&(t.classList.add("is-hidden"),_("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),u("An error occurred while fetching the gallery.")}}function k(e){const s=e.map(({webformatURL:n,largeImageURL:m,tags:g,likes:y,views:w,comments:b,downloads:v})=>`
      <div class="photo-card">
        <a href="${m}">
          <img class="photo-img" src="${n}" alt="${g}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${y}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${w}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${b}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${v}</span></p>
        </div>
      </div>`).join("");d.insertAdjacentHTML("beforeend",s),E.refresh()}t.addEventListener("click",async()=>{r.incrementPage(),await p()});function l(e){a.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:4e3,closeOnEscape:!0,closeOnClick:!0})}function u(e){a.error({title:"Error",message:e,position:"topRight",color:"red",timeout:3e3,closeOnEscape:!0,closeOnClick:!0})}function S(e){a.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function _(e){a.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:3e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers3.js.map
