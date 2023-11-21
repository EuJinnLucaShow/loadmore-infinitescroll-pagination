import{a as l,l as T}from"./assets/lightbox-cda38ac4.js";/* empty css                     */import{i as _}from"./assets/vendor-990b7ae0.js";const $=document.getElementById("search-button"),b=document.querySelector(".gallery"),v=document.getElementById("search-bar"),d=document.getElementById("pagination-container"),u=document.getElementById("pagination-numbers"),f=document.getElementById("prev-button"),m=document.getElementById("next-button");let c=0,i=!0,a=1,h="";$.addEventListener("click",function(e){e.preventDefault(),L(),i=!0,a=1});v.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),L()),i=!0,a=1});f.addEventListener("click",()=>g(a-1));m.addEventListener("click",()=>g(a+1));async function L(){const e=v.value.trim();if(l.setQuery(e),e===""){r("warning","Please, fill the main field"),d.classList.add("is-hidden");return}if(e===h){r("warning","Please, modify or enter a new search field.");return}l.resetPage(),h=e,c=0,await w(1)}async function w(e){try{l.getPage(e);const t=await l.fetchGallery(),{hits:s,totalHits:n}=t;if(i&&!s.length){r("error","Sorry, no images matching your search query. Please try again."),d.classList.add("is-hidden");return}i&&c<n&&(r("success",`Hooray! We found ${n} images!`),I({hits:s,totalHits:n}),i=!1),b.innerHTML="",A(s),c+=s.length,i&&c>=n&&r("info","You've reached the end of search results.")}catch(t){console.error("Error fetching gallery:",t),r("error","An error occurred while fetching the gallery.")}}function A(e){const t=e.map(({webformatURL:s,largeImageURL:n,tags:o,likes:P,views:k,comments:C,downloads:S})=>`
      <div class="photo-card">
        <a href="${n}">
          <img class="photo-img" src="${s}" alt="${o}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${P}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${k}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${C}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${S}</span></p>
        </div>
      </div>`).join("");b.insertAdjacentHTML("beforeend",t),T.refresh()}function I({hits:e,totalHits:t}){const s=Math.ceil(t/e.length);u.innerHTML="";for(let n=1;n<=s;n++){const o=document.createElement("button");o.className="pagination-number",o.textContent=n,u.appendChild(o),s>1?d.classList.remove("is-hidden"):d.classList.add("is-hidden"),o.addEventListener("click",()=>{g(n),i=!1})}E(),B()}async function g(e){a=e,await w(a),H(),E(),B()}const p=e=>{e.classList.add("disabled"),e.setAttribute("disabled",!0)},y=e=>{e.classList.remove("disabled"),e.removeAttribute("disabled")},E=()=>{a===1?p(f):y(f),a===u.children.length?p(m):y(m)},B=()=>{document.querySelectorAll(".pagination-number").forEach((e,t)=>{e.classList.remove("active"),t+1===a&&e.classList.add("active")})};function r(e,t){_[e]({title:e.charAt(0).toUpperCase()+e.slice(1),message:t,position:"topRight",color:e==="success"?"green":e==="warning"?"yellow":e==="error"?"red":"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function H(){window.scrollTo({top:0,behavior:"auto"})}
//# sourceMappingURL=commonHelpers4.js.map
