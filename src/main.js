import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showNotification, smoothScroll } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.js-load-more');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

form.addEventListener('submit', (event) => {
  event.preventDefault();
  query = event.currentTarget.elements.query.value.trim();
  if (!query) return;
  page = 1;
  totalHits = 0;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none'; 
  searchImages();
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  searchImages();
});

async function searchImages() {
  loader.style.display = 'block'; 
  try {
    const { hits: images, totalHits: total } = await fetchImages(query, page);

    if (page === 1) {
      totalHits = total;
      if (total === 0) {
        showNotification("Sorry, there are no images matching your search query. Please try again!");
        return;
      }
    }

    renderGallery(images, gallery);
    lightbox.refresh();
    
    if (images.length === 15 && page * 15 < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      if (page * 15 >= totalHits) {
        showNotification("We're sorry, but you've reached the end of search results.");
      }
    }

    if (page > 1) {
      smoothScroll();
    }
  } catch (error) {
    showNotification('Failed to load images. Please try again later.');
  } finally {
    loader.style.display = 'none'; 
  }
}
