/**
 * Menues and specials
 */
import React, { useRef } from 'react';
import './Container.css';
import Button from 'shared/Button';

// zergski logic
import { useGlobalObj } from 'zergski-global';

// media
import menuImage from 'ass/img/menu.jpg';

// components
import ImageWrapper from 'shared/ImageWrapper';

const MenuContainer = props => {
	const Menu = {
		ref: useRef(null),
		index: 4,
	}
	const MenuHeading = {
		ref: useRef(null),
		index: 4,
		initialState: 'idle bottom',
	}
	const MenuButtons = {
		ref: useRef(null),
		index: 4,
		initialState: 'idle bottom',
	}
	const [ state ] = useGlobalObj({ Menu }, 'Sections');
	const [ headingState ] = useGlobalObj({ MenuHeading }, 'ViewportAnimated');
	const [ buttonsState ] = useGlobalObj({ MenuButtons }, 'ViewportAnimated');

   return (
      <section className={ `Menu-Container accent ${ state }` }>

			<div className="Menu-Group" ref={ Menu.ref }>
				<ImageWrapper imgSrc= { menuImage }
					imgDesc="A la carté risotto rätt"
					altClass="background overlay"
					style={{ opacity: 1 }}
				/>
				<div className={ `Heading-Group ${ headingState } va` } ref={ MenuHeading.ref }>
					<h1 data-zcm="menu.heading">
						Våran Meny
					</h1>
					<h3 data-zcm="menu.body">
						Till ölen, och våra väl utvalda viner, hittar du en meny vi serverar med stolthet. All mat är gjord från grunden av bästa möjliga råvaror tillagad med kärlek.
					</h3>
				</div>
			</div>

			<div className={ `Button-Group ${ buttonsState } va` } ref={ MenuButtons.ref }>
				<Button altClass="menu"
					text="Lunch"
				/>
				<Button altClass="menu"
					text="A la Carté"
				/>
				<Button altClass="menu"
					text="Öl & Dryck"
				/>
			</div>
      </section>
   );
}

export default MenuContainer;