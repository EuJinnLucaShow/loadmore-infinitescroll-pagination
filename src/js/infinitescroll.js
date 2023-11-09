import '../sass/index.scss';
import ApiService from './api';
import { lightbox } from './lightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchButton = document.getElementById("search-button");
const galleryContainer = document.querySelector('.gallery');
const searchQueryInput = document.querySelector('#search-bar');

let isShown = 0;
const api = new ApiService();

searchButton.addEventListener("click", function(event) {
  event.preventDefault();
  onSearch();
});

searchQueryInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    onSearch();
  }
});

function onSearch() {
  const searchQuery = searchQueryInput.value.trim();

  galleryContainer.innerHTML = '';
  api.query = searchQuery;
  api.resetPage();

  if (searchQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please, fill the main field',
      position: 'topRight',
      color: 'yellow',
    });
    return;
  }

  searchQueryInput.value = '';

  isShown = 0; 
  fetchGallery();
}

async function fetchGallery() {
  const result = await api.fetchGallery();
  const { hits, totalHits } = result;
  isShown += hits.length;

  if (!hits.length) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
      color: 'red',
    });

    return;
  }

  onRenderGallery(hits);
  isShown += hits.length;    

  if (isShown < totalHits) {
    iziToast.success({
      title: 'Success',
      message: `Hooray! We found ${totalHits} images !!!`,
      position: 'topRight',
      color: 'green',
    });
  }

  if (isShown >= totalHits) {
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      color: 'blue',
    });
  }  
}

function onRenderGallery(elements) {
  const markup = elements
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
       <div class="photo-card">
       <a href="${largeImageURL}">
       <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
       </a>
       <div class="info">
       <p class="info-item"><b>Likes</b><span class="info__span">${likes}</span></p>
       <p class="info-item"><b>Views</b><span class="info__span">${views}</span></p>
       <p class="info-item"><b>Comments</b><span class="info__span">${comments}</span></p>
       <p class="info-item"><b>Downloads</b><span class="info__span">${downloads}</span></p>
       </div>
       </div>`;
      }
    )
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function onLoadMore() {
   api.incrementPage();
  fetchGallery();
}

function checkIfEndOfPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}

window.addEventListener('scroll', showLoadMorePage);

function showLoadMorePage() {
  if (checkIfEndOfPage()) {
    onLoadMore();
  }
}

