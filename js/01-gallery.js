import { galleryItems } from './gallery-items.js';

// Change code below this line

console.log(galleryItems);
let modal;
const galleryRef = document.querySelector('.gallery');
const images = galleryItems.map(({ preview, original, description }) => 
     `<div class="gallery__item">
       <a class="gallery__link" href="${original}">
        <img
        loading="lazy"
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
      </a>
     </div>`
).join('');
   
const onImageOpenModal = (event)=>{
    event.preventDefault();
    if (event.target.nodeName === "IMG") {
        modal = basicLightbox.create(`
            <img width="1200" height="900" src="${event.target.dataset.source}" alt="${event.target.alt}">
        `);
        modal.show();
        galleryRef.addEventListener('keydown', onKeyCloseModal);
        modal.element().addEventListener('click', (e) => galleryRef.removeEventListener('keydown', onKeyCloseModal), {once: true});
    }
}
const onKeyCloseModal = (event) => {
    if (event.key === "Escape") {
        modal.close()
        galleryRef.removeEventListener('keydown', onKeyCloseModal);
        
    }
}


galleryRef.insertAdjacentHTML("beforeend", images);
galleryRef.addEventListener('click', onImageOpenModal);

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = galleryRef.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => 
        img.src = img.dataset.source
    );
 
}
else {
    const noLazyImage = galleryRef.querySelectorAll('img');
    noLazyImage.forEach(img => {
        img.classList.add("lazyload")
        img.dataset.src = img.dataset.source;
    });
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossOrigin = "anonymous";
    script.referrerPolicy = "no-referrer"
    document.body.append(script);
}


