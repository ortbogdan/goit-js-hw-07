import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('ul.gallery');

const images = galleryItems.map(({ preview, original, description }) => 
    `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" loading="lazy" src="${preview}" alt="${description}" />
      </a>
    </li>`
).join('');

galleryRef.insertAdjacentHTML("beforeend", images);

let gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, });

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = galleryRef.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img =>
    img.dataset.src = img.src
    );
}
else {
    const noLazyImage = galleryRef.querySelectorAll('img');
    noLazyImage.forEach(img => {
        img.classList.add("lazyload")
        img.dataset.src = img.src;
    });
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer"
    document.body.append(script);
}