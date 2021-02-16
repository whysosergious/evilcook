


export const galleryMedia = require('./gallery.json');

galleryMedia.recLoop(e => {
	e.src = require(`../${ e.src }`).default
})

// const galleryMedia = JSON.parse(galleryMediaJSON);

console.log(galleryMedia)
// console.log(galleryMedia)






// JSON.stringify(galleryMedia);