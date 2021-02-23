/**
 * Image Gallery
 */
import React, { useRef } from 'react';
import './Container.css';

// zergski logic
import { useGlobalObj, globalObj } from 'zergski-global';
import { routerHook } from 'logic/router';

//media
import tempImage1 from 'ass/img/gallery/gal-temp1.jpg';
import tempImage2 from 'ass/img/gallery/gal-temp2.jpg';
import tempImage3 from 'ass/img/gallery/gal-temp3.jpg';
import tempImage4 from 'ass/img/gallery/gal-temp4.jpg';
import tempImage5 from 'ass/img/gallery/gal-temp5.jpg';
import tempImage6 from 'ass/img/gallery/gal-temp6.jpg';
import tempImage7 from 'ass/img/gallery/gal-temp7.jpg';
import tempImage8 from 'ass/img/gallery/gal-temp8.jpg';
import tempImage9 from 'ass/img/gallery/gal-temp9.jpg';

// components
import GalleryGrid from 'shared/GalleryGrid';
import Button from 'shared/Button';

const GalleryContainer = props => {
	// deconstructing
	const { MediaViewer } = globalObj;

	const Gallery = {
		ref: useRef(null),
		index: 3,
	}
	const GalleryHeading = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle',
	}
	// const GalleryGrid = {
	// 	ref: useRef(null),
	// 	index: 1,
	// 	initialState: 'idle',
	// }
	const [ state, setState ] = useGlobalObj({ Gallery }, 'Sections');
	const [ headingState ] = useGlobalObj({ GalleryHeading }, 'ViewportAnimated');
	// const [ gridState ] = useGlobalObj({ GalleryGrid }, 'ViewportAnimated');

	// const handleClick = index => {
	// 	MediaViewer.setState({ display: 'show', index });
	// }

	const routeToGallery = () => {
		routerHook.routeTo('gallery');
	}

   return (
      <section className="Gallery-Container dark" ref={ Gallery.ref }>
			<div className={ `Heading-Group ${ headingState } va` } ref={ GalleryHeading.ref }>
				<h1 data-zcm="gallery.heading">
					Bildgalleri
				</h1>
			</div>

			<GalleryGrid />

			<Button text="Fler bilder"
				style={{ marginTop: '5rem' }}
				clicked={ routeToGallery }
			/>
      </section>
   );
}

export default GalleryContainer;