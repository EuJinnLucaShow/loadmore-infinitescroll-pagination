import{l as E,A as L}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i as a}from"./assets/vendor-a94593f8.js";const k=document.getElementById("search-button"),d=document.querySelector(".gallery"),p=document.querySelector("#search-bar"),t=document.querySelector(".btn__load-more");let o=0;const r=new L;let i=!0,c="";k.addEventListener("click",function(e){e.preventDefault(),f(),i=!0});p.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),f()),i=!0});function f(){const e=p.value.trim();if(r.query=e,e===""){t.classList.add("is-hidden"),l("Please, fill the main field");return}if(e===c){t.classList.add("is-hidden"),l("Please, enter new query.");return}d.innerHTML="",r.resetPage(),c=e,o=0,h()}async function h(){try{const e=await r.fetchGallery(),{hits:s,totalHits:n}=e;if(!s.length){t.classList.add("is-hidden"),u("Sorry, there are no images matching your search query. Please try again.");return}i&&o<n&&(_(`Hooray! We found ${n} images !!!`),i=!1,t.classList.remove("is-hidden")),S(s),o+=s.length,o>=n&&(t.classList.add("is-hidden"),O("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),u("An error occurred while fetching the gallery.")}}function S(e){const s=e.map(({webformatURL:n,largeImageURL:m,tags:g,likes:y,views:w,comments:b,downloads:v})=>`
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
      </div>`).join("");d.insertAdjacentHTML("beforeend",s),E.refresh()}t.addEventListener("click",async()=>{r.incrementPage(),await h()});function l(e){a.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function u(e){a.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function _(e){a.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function O(e){a.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers3.js.map
