/**
 * Above the fold content
 */
import React from 'react';
import './Container.css';
import Button from 'shared/Button';
import { globalObj } from 'zergski-global';

// components

const LandingContainer = props => {

	const handleClick = target => {
		globalObj.ModalWindow.setState(target);
	}

	return (
		<section className="Landing-Container">


			<div className="Greeting-Group">

				<h1><span>Välkommen hem till</span>Oliver Twist</h1>
				<h2>-Stockholm-</h2>
			</div>

			<div className="Button-Group">
				<Button altClass="underline small"
					text="Våra Öppettider"
					clicked={ ()=>handleClick('Hours') }
				/>
				<Button altClass="cta"
					text="Boka bord"
					clicked={ ()=>handleClick('Book') }
				/>
			</div>
		</section>
	);
}

export default LandingContainer;