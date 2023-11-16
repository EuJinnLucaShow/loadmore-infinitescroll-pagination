const API_KEY = '34523545-f21683fd59bfc3e4e2549fe07';
const BASE_URL = 'https://pixabay.com/api/';
const DEFAULT_PER_PAGE = 40;

function apiService() {
  let searchQuery = '';
  let page = 1;

  const fetchGallery = async () => {
    try {
      const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: DEFAULT_PER_PAGE,
      });

      const response = await fetch(`${BASE_URL}?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  };

  const incrementPage = () => {
    page += 1;
  };

  const resetPage = () => {
    page = 1;
  };

  const getQuery = () => {
    return searchQuery;
  };

  const setQuery = (newQuery) => {
    searchQuery = newQuery;
    resetPage();
  };

  const getPage = (currentPage) => {
    page = currentPage;
  };

  return {
    fetchGallery,
    incrementPage,
    resetPage,
    getQuery,
    setQuery,
    getPage,
  };
}

export default apiService();
