import{l as w,A as E}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i}from"./assets/vendor-a94593f8.js";const v=document.getElementById("search-button"),l=document.querySelector(".gallery"),u=document.querySelector("#search-bar"),n=document.querySelector(".btn__load-more");let o=0;const r=new E;let a=!0;v.addEventListener("click",p);u.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),p()),a=!0});function p(){const e=u.value.trim();if(l.innerHTML="",r.query=e,r.resetPage(),e===""){n.classList.add("is-hidden"),S("Please, fill the main field");return}o=0,h()}async function h(){try{const e=await r.fetchGallery(),{hits:t,totalHits:s}=e;if(!t.length){c("Sorry, there are no images matching your search query. Please try again.");return}a&&o<s&&(_(`Hooray! We found ${s} images !!!`),a=!1,n.classList.remove("is-hidden")),k(t),o+=t.length,o>=s&&(n.classList.add("is-hidden"),L("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),c("An error occurred while fetching the gallery.")}}function k(e){const t=e.map(({webformatURL:s,largeImageURL:d,tags:f,likes:m,views:g,comments:y,downloads:b})=>`
      <div class="photo-card">
        <a href="${d}">
          <img class="photo-img" src="${s}" alt="${f}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${m}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${g}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${y}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${b}</span></p>
        </div>
      </div>`).join("");l.insertAdjacentHTML("beforeend",t),w.refresh()}n.addEventListener("click",async()=>{r.incrementPage(),await h()});function S(e){i.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function c(e){i.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function _(e){i.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function L(e){i.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers3.js.map
