/* empty css                     */import{a as m,S as y,i as c}from"./assets/vendor-a94593f8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();class b{constructor(){this.searchQuery="",this.page=1,this.PER_PAGE=9}async fetchGallery(){const t={method:"get",url:"https://pixabay.com/api/",params:{key:"34523545-f21683fd59bfc3e4e2549fe07",q:`${this.searchQuery}`,image_type:"photo",orientation:"horizontal",safesearch:!0,page:`${this.page}`,per_page:`${this.PER_PAGE}`}};try{return(await m(t)).data}catch(o){console.error(o)}}incrementPage(){this.page+=1}resetPage(){this.page=1}resetEndOfHits(){this.endOfHits=!1}get query(){return this.searchQuery}set query(t){this.searchQuery=t}}let w=new y(".photo-card a",{captions:!0,captionsData:"alt",captionDelay:250});const P=document.getElementById("search-button"),p=document.querySelector(".gallery"),u=document.querySelector("#search-bar");let a=0;const l=new b;P.addEventListener("click",function(r){r.preventDefault(),f()});u.addEventListener("keydown",function(r){r.key==="Enter"&&(r.preventDefault(),f())});function f(){const r=u.value.trim();if(p.innerHTML="",l.query=r,l.resetPage(),r===""){c.warning({title:"Warning",message:"Please, fill the main field",position:"topRight",color:"yellow"});return}u.value="",a=0,d()}async function d(){const r=await l.fetchGallery(),{hits:t,totalHits:o}=r;if(a+=t.length,!t.length){c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",color:"red"});return}v(t),a+=t.length,a<o&&c.success({title:"Success",message:`Hooray! We found ${o} images !!!`,position:"topRight",color:"green"}),a>=o&&c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"})}function v(r){const t=r.map(({webformatURL:o,largeImageURL:n,tags:e,likes:s,views:i,comments:h,downloads:g})=>`
       <div class="photo-card">
       <a href="${n}">
       <img class="photo-img" src="${o}" alt="${e}" loading="lazy" />
       </a>
       <div class="info">
       <p class="info-item"><b>Likes</b><span class="info__span">${s}</span></p>
       <p class="info-item"><b>Views</b><span class="info__span">${i}</span></p>
       <p class="info-item"><b>Comments</b><span class="info__span">${h}</span></p>
       <p class="info-item"><b>Downloads</b><span class="info__span">${g}</span></p>
       </div>
       </div>`).join("");p.insertAdjacentHTML("beforeend",t),w.refresh()}function E(){l.incrementPage(),d()}function L(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}window.addEventListener("scroll",_);function _(){L()&&E()}
//# sourceMappingURL=commonHelpers2.js.map
