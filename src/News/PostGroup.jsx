/**
 * News post group component
 */
import React, { useEffect, useState } from 'react';
import { globalObj } from 'zergski-global';

// components
import NewsPost from './Post';

// temp media
import tempImg0 from 'ass/img/gallery/gal-temp1.jpg';
import tempImg1 from 'ass/img/gallery/gal-temp2.jpg';
import tempImg2 from 'ass/img/gallery/gal-temp3.jpg';
import tempImg3 from 'ass/img/gallery/gal-temp4.jpg';
import tempImg4 from 'ass/img/gallery/gal-temp5.jpg';
import tempImg5 from 'ass/img/gallery/gal-temp6.jpg';
import tempImg6 from 'ass/img/gallery/gal-temp7.jpg';
import tempImg7 from 'ass/img/gallery/gal-temp8.jpg';
import tempImg8 from 'ass/img/gallery/gal-temp9.jpg';


const tempImgArr = [ tempImg0, tempImg1, tempImg2, tempImg3, tempImg4, tempImg5, tempImg6, tempImg7, tempImg8 ];
var tempCount = 0;

const PostGroup = ({ index: groupNr }) => {


	const displayPosts = () => {
		let array = [];
		// 3 posts per group
		for ( let i=groupNr*3; i<groupNr*3+3; i++ ) {
			array.push(
				<NewsPost key={ i+4400 }
					index={ i }
					imgSrc={ tempImgArr[tempCount] }

				/>

			);
			tempCount = tempCount === 8 ? 0 : ++tempCount;
		}
		return array;

	}
	const [ state, setState ] = useState(null)
	useEffect(() => {
		setState(displayPosts());
		setTimeout(()=> {
			globalObj.getOffsets('Sections')
		}, 40);
	}, [])


   return (
		<div className="Post-Group">
			{ state }
		</div>
	);
}

export default PostGroup;