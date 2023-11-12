import '../sass/index.scss';
import ApiService from './api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// DOM Elements
const searchButton = document.getElementById('search-button');
const galleryContainer = document.querySelector('.gallery');
const searchQueryInput = document.querySelector('#search-bar');
const paginationByttons = document.getElementById('pagination-numbers');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// Constants
let isShown = 0;
let isFirstSearch = true;
let currentPage = 1;
const api = new ApiService();

// Event Listeners
searchButton.addEventListener('click', onSearch);
searchQueryInput.addEventListener('keydown', handleEnterKey);
prevButton.addEventListener('click', () => setCurrentPage(currentPage - 1));
nextButton.addEventListener('click', () => setCurrentPage(currentPage + 1));

// Main Functions

async function onSearch() {
  const searchQuery = searchQueryInput.value.trim();

  clearGallery();
  api.query = searchQuery;
  api.resetPage();

  if (searchQuery === '') {
    showToast('warning', 'Please, fill the main field');
    return;
  }

  searchQueryInput.value = '';

  isShown = 0;
  await fetchGallery(1); // Pass the current page
}

async function fetchGallery(currentPage) {
  try {
    api.getPage(currentPage)
    const result = await api.fetchGallery();
    const { hits, totalHits } = result;

    if (!hits.length) {
      showToast('error', 'Sorry, no images matching your search query. Please try again.');
      return;
    }

    if (isFirstSearch && isShown < totalHits) {
      showToast('success', `Hooray! We found ${totalHits} images !!!`);
      isFirstSearch = false;
      setupPagination({ hits, totalHits });
    }

    clearGallery();
    onRenderGallery(hits);
    isShown += hits.length;

    if (isShown >= totalHits) {
      showToast('info', "You've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error fetching gallery:', error);
    showToast('error', 'An error occurred while fetching the gallery.');
  }
}

function onRenderGallery(elements) {
  const markup = elements
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
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
      </div>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  galleryContainer.innerHTML = '';
}

function showToast(type, message) {
  iziToast[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the first letter
    message: message,
    position: 'topRight',
    color: type === 'success' ? 'green' : type === 'warning' ? 'yellow' : type === 'error' ? 'red' : 'blue',
    timeout: 2000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}

// Helper Functions
function handleEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    onSearch();
  }
  isFirstSearch = true;
}

function setupPagination({ hits, totalHits }) {
  
  const pageCount = Math.ceil(totalHits / hits.length);

  paginationByttons.innerHTML = ''; // Clear existing pagination

  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-number';
    pageNumber.textContent = i;

    paginationByttons.appendChild(pageNumber);

    pageNumber.addEventListener('click', () => {
      setCurrentPage(i);
  });
  }

  handlePageButtonsStatus();
}

function setCurrentPage(i) {
  currentPage = i; 
  fetchGallery(currentPage);
  handlePageButtonsStatus();
}

function handlePageButtonsStatus() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage ===  paginationByttons.children.length;
}

prevButton.addEventListener('click', () => {
  setCurrentPage(currentPage - 1);
});

nextButton.addEventListener('click', () => {
  setCurrentPage(currentPage + 1);
});
