import React, { useState, useEffect } from 'react';
import './Window.css';
import { globalObj, useGlobalObj } from 'zergski-global';

// components
import Anchor from 'shared/Anchor';
import BusinessHours from 'BusinessHours/Container';
import OnlineBooking from './OnlineBooking';

const ModalWindow = props => {
	const ModalWindow = {
		initialState: 'hidden',
	}
	const [ state, setState ] = useGlobalObj({ ModalWindow });
	const [ windowState, setWindowState ] = useState(false);


	const handleClose = () => {
		setWindowState(false);
		setTimeout(() => {
			globalObj.main.ref.classList.remove('blur');
			setTimeout(() => {
				setState('hidden');
			}, 1000);
		}, 400);
	}

	const animateModal = () => {
		globalObj.main.ref.classList.add('blur');
		setTimeout(()=>{
			setWindowState(true);
		}, 400);
	}

	useEffect(() => {
		state !== 'hidden' && animateModal();
	}, [state]);


	return(
		<div className={ `Modal-Container ${ state }` }>
			<div className={ `Blur-Overlay ${ state !== 'hidden' ? 'shown' : 'hidden' }` }></div>
			<div className={ `Modal-Window striped ${ windowState ? 'shown' : 'hidden' }` }>
					<BusinessHours altClass={ state === 'Hours' ? 'shown' : 'hidden' } />
					<OnlineBooking altClass={ state === 'Book' ? 'shown' : 'hidden' } />

					<Anchor
						altClass="icon"
						fileName="cross.svg"
						style={{ position: 'absolute', top: '0', right: '0', opacity: '.5' }}
						clicked={ handleClose }
					/>
			</div>
		</div>
	);
}

export default ModalWindow;