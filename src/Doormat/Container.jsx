/**
 * Promotion and introductory content
 */
import React, { useRef, useEffect } from 'react';
import './Container.css';
import styles from './Doormat.module.css';

// zergski logic
import { useGlobalObj, globalObj } from 'zergski-global';

// media
import promoBackgroundImage from 'ass/img/promo/waob.jpg';
import doormatBackgroundImage from 'ass/vector/files/fridge.svg';

// components
import Button from 'shared/Button';
import ImageWrapper from 'shared/ImageWrapper';


var ZCM = {
	focus: '',
	shared: {
		moreButton: 'Läs Mer'
	}
};





const fswrite = 'http://localhost/brokenOt/fw.php';

// const jsonObject = { hello: 'server', showme: 'youre working' };

async function postData(dataObj) {

	const response = await fetch(
		fswrite,
		{
			method: "POST",
			headers: {
				    'Content-Type': 'application/json',
				  },
			body: JSON.stringify(dataObj)
		}
	);

	const data = await response.text();

	console.log(data);

}

const _zSave = () => {
	ZCM.focus.removeAttribute('contentEditable');
	ZCM.focus = '';
	postData(ZCM);
}
const _zEdit = ( event ) => {
	let { target } = event;
	ZCM[target.dataset.zsection][target.dataset.zname] = target.innerHTML;
	console.log(ZCM);
}
const _zFocus = ( event ) => {
	let { target } = event;
	ZCM.focus = target;
	target.setAttribute('contentEditable', '');
	// target.onKeyDown = (e) => {
	// 	console.log(e);
	// }
	console.log(target.dataset.zname);
}

const _zcm = ( name, section='shared' ) => {
	ZCM[section] || (ZCM[section] = {});
	let content = ZCM[section][name] ?? name;

	return <z-e data-zname={ name } data-zsection={ section } 
		onClick={ _zFocus } 
		onInput={ _zEdit } 
		onBlur={ _zSave }
		dangerouslySetInnerHTML={{ __html: content }}
		/>
}




const DoormatContainer = props => {
	const Promo = {
		ref: useRef(null),
		index: 2,
		initialState: 'idle bottom',
	}
	const Doormat = {
		ref: useRef(null),
		index: 3,
		initialState: 'idle right',
	}
	const [ promoState ] = useGlobalObj({ Promo }, 'ViewportAnimated');
	const [ doormatState ] = useGlobalObj({ Doormat }, 'ViewportAnimated');

	const scrollToMenu = () => {
		globalObj.Sections.Nav.scrollTo('Menu');
	}

	useEffect(() => {
		// fetching content JSON
		fetch('http://localhost/brokenOt/test/data.json'
		,{
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		}
		)
			.then(function(response){
				console.log(response)
				return response.json();
			})
			.then(function(myJson) {
				
				ZCM = myJson;
				console.log(ZCM);
			});
	}, [])

   return (
		<>
			<section className={ `Promo-Container accent` } ref={ Promo.ref }>
				<ImageWrapper imgSrc={ promoBackgroundImage }
					imgDesc="World Atlas of Beer guide 2021 edition by Timm Webb and Stephen Beumont"
					altClass={ styles.background_filter }
				/>


				<div className={ `${ styles.headingGroup } ${ promoState } va` }>
					<h1 data-zcm="promo.heading"><span>En av de bästa</span>I världen</h1>
					<h3 data-zcm="promo.body">bodytext
					</h3>
					<Button altClass="underline"
						text="Läs mer"
						style={{ marginTop: '3rem' }}
					/>
				</div>

			</section>
			<section className={ `Doormat-Container dark` } ref={ Doormat.ref }>
				<ImageWrapper imgSrc={ doormatBackgroundImage }
					imgDesc="Shelves with beer cans in the bars fridge"
					altClass="background"

					style={{ opacity: 0.07 }}
				/>
				<div className={ `${ styles.headingGroup_left } ${ doormatState } va` }>
					<h2 data-zcm="doormat.heading">
						Ett sortiment vi är stolta över
					</h2>
					<h3 className="small" data-zcm="doormat.body">
						På fat har vi 23 olika öl som roterar med sorter från världens bästa bryggerier. Bland våra 180+ olika flasköl, även där med ett alternerande sortiment, hittar du precis det du letar efter. Vi har nåt för alla.
					</h3>
					<Button altClass="underline small"
						text="Läs våran meny"
						style={{ marginTop: '2rem' }}
						clicked={ scrollToMenu }
					/>
				</div>
			</section>
		</>
   );
}

export default DoormatContainer;