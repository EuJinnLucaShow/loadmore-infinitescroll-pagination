import '../sass/index.scss';
import ApiService from './api';
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
let isFirstSearch = null;
let currentPage = 1;
let query = ''
const api = new ApiService();

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

prevButton.addEventListener('click', () => setCurrentPage(currentPage - 1));
nextButton.addEventListener('click', () => setCurrentPage(currentPage + 1));

async function onSearch() {
  const searchQuery = searchQueryInput.value.trim();
  
  api.query = searchQuery;  

  if (searchQuery === '') {
    showToast('warning', 'Please, fill the main field');
    paginationContainer.classList.add('is-hidden')
    return;
  }

  if (searchQuery === query) {    
    showToast('warning', 'Please, modify or enter a new search field.');
    return;
  }

  galleryContainer.innerHTML = '';
  api.resetPage();
  query = searchQuery;
  isShown = 0;
  await fetchGallery(1);
}

async function fetchGallery(currentPage) {
  try {
    api.getPage(currentPage)
    const result = await api.fetchGallery();
    const { hits, totalHits } = result;

    if (!hits.length) {
      showToast('error', 'Sorry, no images matching your search query. Please try again.');
      paginationContainer.classList.add('is-hidden')
      return;
    }

    if (isFirstSearch && isShown < totalHits) {
      showToast('success', `Hooray! We found ${totalHits} images!`);
      isFirstSearch = false;
      setupPagination({ hits, totalHits });
    }

    galleryContainer.innerHTML = '';
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
  lightbox.refresh();
}

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

function setupPagination({ hits, totalHits }) {
  
  const pageCount = Math.ceil(totalHits / hits.length);

  paginationByttons.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement('button');
    pageNumber.className = 'pagination-number';
    pageNumber.textContent = i;

    paginationByttons.appendChild(pageNumber);

    if (pageCount > 2) {
       paginationContainer.classList.remove('is-hidden')
    }
   
    pageNumber.addEventListener('click', () => {
      setCurrentPage(i);
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