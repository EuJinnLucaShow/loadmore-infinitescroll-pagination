import{l as w,A as E}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i}from"./assets/vendor-a94593f8.js";const v=document.getElementById("search-button"),l=document.querySelector(".gallery"),u=document.querySelector("#search-bar"),o=document.querySelector(".btn__load-more");let n=0;const r=new E;let a=!0;v.addEventListener("click",d);u.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),d()),a=!0});function d(){const e=u.value.trim();if(l.innerHTML="",r.query=e,r.resetPage(),e===""){o.classList.add("is-hidden"),L("Please, fill the main field");return}n=0,p()}async function p(){try{const e=await r.fetchGallery(),{hits:s,totalHits:t}=e;if(!s.length){o.classList.add("is-hidden"),c("Sorry, there are no images matching your search query. Please try again.");return}a&&n<t&&(S(`Hooray! We found ${t} images !!!`),a=!1,o.classList.remove("is-hidden")),k(s),n+=s.length,n>=t&&(o.classList.add("is-hidden"),_("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),c("An error occurred while fetching the gallery.")}}function k(e){const s=e.map(({webformatURL:t,largeImageURL:h,tags:f,likes:m,views:g,comments:y,downloads:b})=>`
      <div class="photo-card">
        <a href="${h}">
          <img class="photo-img" src="${t}" alt="${f}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${m}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${g}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${y}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${b}</span></p>
        </div>
      </div>`).join("");l.insertAdjacentHTML("beforeend",s),w.refresh()}o.addEventListener("click",async()=>{r.incrementPage(),await p()});function L(e){i.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function c(e){i.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function S(e){i.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function _(e){i.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers3.js.map
