import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function createGalleryItem(item) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>
    </li>
  `;
}

function renderGallery() {
  const galleryMarkup = galleryItems.map(createGalleryItem).join('');
  galleryList.insertAdjacentHTML('beforeend', galleryMarkup);
}

function openModal(url) {
  const instance = new SimpleLightbox(`<img src="${url}" alt="Image">`, {
    onShow: (instance) => {
      document.body.classList.add('modal-open');
      instance.element().querySelector('img').focus();
    },
    onClose: () => {
      document.body.classList.remove('modal-open');
    },
  });

  instance.show();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      instance.close();
    }
  });
}

function handleGalleryClick(event) {
  event.preventDefault();

  const target = event.target;
  if (target.classList.contains('gallery__image')) {
    const largeImageUrl = target.dataset.source;
    openModal(largeImageUrl);
  }
}

galleryList.addEventListener('click', handleGalleryClick);

renderGallery();
