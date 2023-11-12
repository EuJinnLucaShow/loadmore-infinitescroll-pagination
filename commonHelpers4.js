import{l as S,A as _}from"./assets/lightbox-d0b00aba.js";/* empty css                     */import{i as $}from"./assets/vendor-a94593f8.js";const I=document.getElementById("search-button"),f=document.querySelector(".gallery"),v=document.getElementById("search-bar"),g=document.getElementById("pagination-container"),d=document.getElementById("pagination-numbers"),u=document.getElementById("prev-button"),m=document.getElementById("next-button");let o=0,c=null,a=1,h="";const l=new _;I.addEventListener("click",function(e){e.preventDefault(),L(),c=!0});v.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),L()),c=!0});u.addEventListener("click",()=>p(a-1));m.addEventListener("click",()=>p(a+1));async function L(){const e=v.value.trim();if(l.query=e,e===""){r("warning","Please, fill the main field"),g.classList.add("is-hidden");return}if(e===h){r("warning","Please, modify or enter a new search field.");return}f.innerHTML="",l.resetPage(),h=e,o=0,await E(1)}async function E(e){try{l.getPage(e);const t=await l.fetchGallery(),{hits:s,totalHits:n}=t;if(!s.length){r("error","Sorry, no images matching your search query. Please try again."),g.classList.add("is-hidden");return}c&&o<n&&(r("success",`Hooray! We found ${n} images!`),c=!1,T({hits:s,totalHits:n})),f.innerHTML="",H(s),o+=s.length,o>=n&&r("info","You've reached the end of search results.")}catch(t){console.error("Error fetching gallery:",t),r("error","An error occurred while fetching the gallery.")}}function H(e){const t=e.map(({webformatURL:s,largeImageURL:n,tags:i,likes:P,views:k,comments:A,downloads:C})=>`
      <div class="photo-card">
        <a href="${n}">
          <img class="photo-img" src="${s}" alt="${i}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b><span class="info__span">${P}</span></p>
          <p class="info-item"><b>Views</b><span class="info__span">${k}</span></p>
          <p class="info-item"><b>Comments</b><span class="info__span">${A}</span></p>
          <p class="info-item"><b>Downloads</b><span class="info__span">${C}</span></p>
        </div>
      </div>`).join("");f.insertAdjacentHTML("beforeend",t),S.refresh()}function r(e,t){$[e]({title:e.charAt(0).toUpperCase()+e.slice(1),message:t,position:"topRight",color:e==="success"?"green":e==="warning"?"yellow":e==="error"?"red":"blue",timeout:2e3,closeOnEscape:!0,closeOnClick:!0})}function T({hits:e,totalHits:t}){const s=Math.ceil(t/e.length);d.innerHTML="";for(let n=1;n<=s;n++){const i=document.createElement("button");i.className="pagination-number",i.textContent=n,d.appendChild(i),s>1&&g.classList.remove("is-hidden"),i.addEventListener("click",()=>{p(n)})}w(),B()}function p(e){a=e,E(a),w(),B()}const y=e=>{e.classList.add("disabled"),e.setAttribute("disabled",!0)},b=e=>{e.classList.remove("disabled"),e.removeAttribute("disabled")},w=()=>{a===1?y(u):b(u),a===d.children.length?y(m):b(m)},B=()=>{document.querySelectorAll(".pagination-number").forEach((e,t)=>{e.classList.remove("active"),t+1===a&&e.classList.add("active")})};
//# sourceMappingURL=commonHelpers4.js.map
