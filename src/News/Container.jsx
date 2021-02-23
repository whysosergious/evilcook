/**
 * News synced to Instagram
 */
import React, { useRef } from 'react';
import './Container.css';

// zergski logic
import { useGlobalObj } from 'zergski-global';

// components
import PostGroup from './PostGroup';
import Button from 'shared/Button';


let count = 0;
let posts = [ <PostGroup key={ count } index={ count } /> ];

const NewsContainer = props => {
	const News = {
		ref: useRef(null),
		index: 2,
		initialState: '',
	}
	const NewsHeading = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle bottom',
	}
	const [ state, setState ] = useGlobalObj({ News }, 'Sections');
	const [ headingState ] = useGlobalObj({ NewsHeading }, 'ViewportAnimated');

	const loadPosts = () => {
		posts[++count] = <PostGroup key={ count } index={ count } />;
		setState(count);
	}

   return (
      <section className={ `News-Container` } ref={ News.ref }>
			<div className={ `Heading-Group ${ headingState } va` } ref={ NewsHeading.ref }
				style={{ width: '80%', maxWidth: '30rem', marginBottom: '4rem' }}
			>
				<h1 className="dark" data-zcm="news.heading">
					<span>Senaste</span>Nyheter
				</h1>
				<h3 className="dark" data-zcm="news.body">
					Evenemang, nysläpp och mycket mer uppdaterat dagligen.
				</h3>
			</div>

			<div className="News-Post-Container">
				{ posts }
			</div>

			<Button altClass="dark"
				style={{ marginTop: '7rem' }}
				text={ 'Ladda fler' }
				clicked={ loadPosts }
			/>
      </section>
   );
}

export default NewsContainer;