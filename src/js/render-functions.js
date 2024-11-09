import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function renderGallery(images, galleryElement) {
  const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a class="gallery-item" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `).join('');
  galleryElement.insertAdjacentHTML('beforeend', markup);
}

export function showNotification(message) {
  iziToast.show({
    message,
    position: 'topRight',
    timeout: 3000,
  });
}

export function smoothScroll() {
  const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
