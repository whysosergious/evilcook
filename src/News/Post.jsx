/**
 * News post component
 */
import React, { useRef, useEffect } from 'react';
import { useGlobalObj, globalObj } from 'zergski-global';

// components
import ImageWrapper from 'shared/ImageWrapper';

// collect and map hashtags before render
const hashTagsArray = ['#beer', '#food', '#etc'];

const hashTags = hashTagsArray.map((tag, index) => {
	return <h5 className="Hash-Tag" key={ index }>{ tag }</h5>;
});



const NewsPost = ({ index, imgSrc }) => {
	const Post = {
		ref: useRef(null),
		index: index,
		initialState: 'idle bottom',
	}
	const [ state ] = useGlobalObj({ [`Post${index}`]: Post }, 'ViewportAnimated');

	useEffect(() => {
		globalObj.Observers.ViewportAnimation.observeElement( globalObj.ViewportAnimated[`Post${index}`].ref )
	}, []);
   return (
      <div className={ `News-Post ${ state } va` } ref={ Post.ref }>
			<ImageWrapper imgSrc={ imgSrc } />

			<div className="News-Post-Content">
				<h5>
					5e Januari 10:47
				</h5>
				<h4>
					Dagen uppställning 💪 Och glöm inte våran fantastiska julpåse som finns att beställa från den 30/11 🤤
				</h4>
				<div className="Tags-Container">
					{ hashTags }
				</div>
			</div>
		</div>
   );
}

export default NewsPost;