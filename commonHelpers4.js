import{l as w,A as b}from"./assets/lightbox-280c1b4a.js";/* empty css                     */import{i as r}from"./assets/vendor-a94593f8.js";const v=document.getElementById("search-button"),l=document.querySelector(".gallery"),i=document.querySelector("#search-bar"),n=new b;let s=0,a=!0;v.addEventListener("click",u);i.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),u()),a=!0});function u(){const e=i.value.trim();if(l.innerHTML="",n.query=e,n.resetPage(),e===""){k("Please, fill the main field");return}i.value="",s=0,p()}async function p(){try{const e=await n.fetchGallery(),{hits:t,totalHits:o}=e;if(!t.length){c("Sorry, there are no images matching your search query. Please try again.");return}a&&s<o&&(S(`Hooray! We found ${o} images !!!`),a=!1,loadMoreButton.classList.remove("is-hidden")),E(t),s+=t.length,s>=o&&(loadMoreButton.classList.add("is-hidden"),L("You've reached the end of search results."))}catch(e){console.error("Error fetching gallery:",e),c("An error occurred while fetching the gallery.")}}function E(e){const t=e.map(({webformatURL:o,largeImageURL:f,tags:h,likes:d,views:m,comments:g,downloads:y})=>`
      <div class="photo-card">
        <a href="${f}">
          <img class="photo-img" src="${o}" alt="${h}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${d}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${m}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${g}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${y}</span></p>
        </div>
      </div>`).join("");l.insertAdjacentHTML("beforeend",t),w.refresh()}loadMoreButton.addEventListener("click",async()=>{n.incrementPage(),await p()});function k(e){r.warning({title:"Warning",message:e,position:"topRight",color:"yellow",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function c(e){r.error({title:"Error",message:e,position:"topRight",color:"red",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function S(e){r.success({title:"Success",message:e,position:"topRight",color:"green",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function L(e){r.info({title:"Info",message:e,position:"topRight",color:"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}
//# sourceMappingURL=commonHelpers4.js.map
