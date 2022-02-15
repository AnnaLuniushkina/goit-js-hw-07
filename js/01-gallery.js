import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryEl = document.querySelector(".gallery");

const listItemsMarkup = createGalleryElMarkup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", listItemsMarkup);


function createGalleryElMarkup(items) {
    return items.map(item => `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
    <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
    />
    </a>
</div>`).join('');
}

galleryEl.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {    
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    event.preventDefault();

    modal(event.target.dataset.source);
}

let instance = null;

function modal(src) {
    instance = basicLightbox.create(`
    <div class="modal">
    <img
        src="${src}"/>
    </div>
`, {
    onShow: instance => {
        addListener();
    },
    onClose: instance => {
        removeListener();
    },
})

    instance.show();
}

function addListener() {
    window.addEventListener('keydown', onEscClick);
}

function onEscClick(event) {
    if (event.code === 'Escape') {
    instance.close();
    }
}

function removeListener() {
    window.removeEventListener('keydown', onEscClick);
}