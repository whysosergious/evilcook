import React, { useEffect, useRef } from 'react';
import './GalleryGrid.css';
import { useGlobalObj } from 'zergski-global';

// components
import ImageWrapper from './ImageWrapper';

// temp media
import { galleryMedia } from 'Objects/gallery';

const handleClick = () => {

}

const imageArray = [];
galleryMedia.recLoop(( e, i ) => {
	imageArray.push(
		<ImageWrapper key={ e.id }
			index={ e.id }
			imgSrc={ e.src }
			imgDesc={ `${ e.title } ${ e.description }` }
			clicked={ handleClick }
		/>
	);
});

const GalleryGrid = ({ count, array }) => {
	const GalleryGrid = {
		ref: useRef(null),
		index: 1,
		initialState: 'idle',
	}
	const [ gridState ] = useGlobalObj({ GalleryGrid }, 'ViewportAnimated');

	// console.log(mediaJSON.recLoop(e => console.log(require('../'+e.src).default)));

	useEffect(() => {


	});

	return(
		<div className={ `Gallery-Grid ${ gridState } va` } ref={ GalleryGrid.ref }>
			{ imageArray }
		</div>
	);
}

export default GalleryGrid;