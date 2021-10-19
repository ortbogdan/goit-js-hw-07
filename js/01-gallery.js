import { galleryItems } from './gallery-items.js';

// Change code below this line

console.log(galleryItems);
let modal;
const galleryRef = document.querySelector('.gallery');
const images = galleryItems.map(({ preview, original, description }) => 
     `<div class="gallery__item">
       <a class="gallery__link" href="${original}">
        <img
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
    if(event.target.nodeName === "IMG"){
          modal = basicLightbox.create(`
            <img width="1200" height="900" src="${event.target.dataset.source}" alt="${event.target.alt}">
        `);
        modal.show();
    }
}
const onKeyCloseModal = (event) => {
    if (event.key === "Escape") {
        modal.close()
    }
}
galleryRef.insertAdjacentHTML("beforeend", images);
galleryRef.addEventListener('click', onImageOpenModal);
galleryRef.addEventListener('keydown', onKeyCloseModal);

