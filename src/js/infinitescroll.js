import '../sass/index.scss';
import apiService from './api';
import { lightbox } from './lightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchButton = document.getElementById("search-button");
const galleryContainer = document.querySelector('.gallery');
const searchQueryInput = document.querySelector('#search-bar');

let isShown = 0;
let isFirstSearch = true;
let query = '';

searchButton.addEventListener("click", function(event) {  
  event.preventDefault();
  onSearch();
  isFirstSearch = true;    
});

searchQueryInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    onSearch();
  }
  isFirstSearch = true;
});

function onSearch() {
  const searchQuery = searchQueryInput.value.trim();
  
  apiService.setQuery(searchQuery);   

  if (searchQuery === '') {    
    showWarningToast('Please, fill the main field');
    return;
  }

    if (searchQuery === query) {    
    showWarningToast('Please, modify or enter a new search field.');
    return;
  }
  
  galleryContainer.innerHTML = '';
  apiService.resetPage();
  query = searchQuery;
  isShown = 0; 
  fetchGallery();
}

async function fetchGallery() {
  try {
    const result = await apiService.fetchGallery();
    const { hits, totalHits } = result;

    if (!hits.length) {
      showErrorToast("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    if (isFirstSearch && isShown < totalHits) {
      showSuccessToast(`Hooray! We found ${totalHits} images !!!`);
      isFirstSearch = false;
    }

    onRenderGallery(hits);
    isShown += hits.length;

    const lastElement = galleryContainer.lastElementChild;
    if (lastElement) {
      intersectionObserver.observe(lastElement);
    }   

    if (isShown >= totalHits) {      
      intersectionObserver.disconnect();
      showInfoToast("You've reached the end of search results.");
    }
  } catch (error) {
    console.error("Error fetching gallery:", error);
    showErrorToast("An error occurred while fetching the gallery.");
  }
}

function onRenderGallery(elements) {
  const markup = elements.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
  }).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const intersectionObserver = new IntersectionObserver(handleIntersection, observerOptions);

function handleIntersection(entries, _observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      apiService.incrementPage()
      fetchGallery();
    }
  });
}

const firstElement = galleryContainer.firstElementChild;
if (firstElement) {
  intersectionObserver.observe(firstElement);
}

function showWarningToast(message) {
  iziToast.warning({
    title: 'Warning',
    message: message,
    position: 'topRight',
    color: 'yellow',
    timeout: 4000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    color: 'red',
    timeout: 3000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}

function showSuccessToast(message) {
  iziToast.success({
    title: 'Success',
    message: message,
    position: 'topRight',
    color: 'green',
    timeout: 2000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}

function showInfoToast(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
    color: 'blue',
    timeout: 3000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}