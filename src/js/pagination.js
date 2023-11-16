import '../sass/index.scss';
import apiService from './api';
import { lightbox } from './lightbox';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchButton = document.getElementById('search-button');
const galleryContainer = document.querySelector('.gallery');
const searchQueryInput = document.getElementById('search-bar');
const paginationContainer = document.getElementById('pagination-container')
const paginationByttons = document.getElementById('pagination-numbers');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let isShown = 0;
let isFirstSearch = true;
let currentPage = 1;
let query = ''

searchButton.addEventListener("click", function(event) {  
  event.preventDefault();
  onSearch();
  isFirstSearch = true;
  currentPage = 1;
});

searchQueryInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    onSearch();
  }
  isFirstSearch = true; 
  currentPage = 1;
});

prevButton.addEventListener('click', () => setCurrentPage(currentPage - 1));
nextButton.addEventListener('click', () => setCurrentPage(currentPage + 1));

async function onSearch() {
  const searchQuery = searchQueryInput.value.trim();
  
  apiService.setQuery(searchQuery); 

  if (searchQuery === '') {
    showToast('warning', 'Please, fill the main field');
    paginationContainer.classList.add('is-hidden')
    return;
  }

  if (searchQuery === query) {    
    showToast('warning', 'Please, modify or enter a new search field.');
    return;
  }  
  
  apiService.resetPage();  
  query = searchQuery;
  isShown = 0;
  await fetchGallery(1);
}

async function fetchGallery(currentPage) {
  try {    
    apiService.getPage(currentPage)
    const result = await apiService.fetchGallery();    
    const { hits, totalHits } = result;

    if (isFirstSearch && !hits.length) {
      showToast('error', 'Sorry, no images matching your search query. Please try again.');
      paginationContainer.classList.add('is-hidden')
      return;
    }

    if (isFirstSearch && isShown < totalHits) {
      showToast('success', `Hooray! We found ${totalHits} images!`);
      setupPagination({ hits, totalHits });
      isFirstSearch = false;      
    }

    galleryContainer.innerHTML = '';
    onRenderGallery(hits);    
    isShown += hits.length;

    if (isFirstSearch && isShown >= totalHits) {
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
  lightbox.refresh();
}

function setupPagination({ hits, totalHits }) {
  
  const pageCount = Math.ceil(totalHits / hits.length); 
  
  paginationByttons.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-number';
    pageNumber.textContent = i;

    paginationByttons.appendChild(pageNumber);

    pageCount > 1 ? paginationContainer.classList.remove('is-hidden') : paginationContainer.classList.add('is-hidden')

    pageNumber.addEventListener('click', () => {
      setCurrentPage(i);
      isFirstSearch = false; 
    });    
  }
  handlePageButtonsStatus();
  handleActivePageNumber();  
}

function setCurrentPage(i) {
  currentPage = i; 
  fetchGallery(currentPage);
  handlePageButtonsStatus();
  handleActivePageNumber();
}

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {  
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (currentPage === paginationByttons.children.length) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {  
  document.querySelectorAll(".pagination-number").forEach((button, page) => {
    button.classList.remove("active");    
    if (page + 1 === currentPage) {
      button.classList.add("active");
    }
  });
};

function showToast(type, message) {
  iziToast[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: message,
    position: 'topRight',
    color: type === 'success' ? 'green' : type === 'warning' ? 'yellow' : type === 'error' ? 'red' : 'blue',
    timeout: 2000,
    closeOnEscape: true,
    closeOnClick: true,
  });
}