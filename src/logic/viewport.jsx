/**
 * Everything related to viewport
 */
import React, { useEffect } from 'react';

const _local = {
	height: window.innerHeight,
	width: window.innerWidth,
	device: 'mobile',
	orientation: 'portrait',
	linked: [],
	link( f ) {
		this.linked.push( f );
	},
	calc() {
		this.height = window.innerHeight;
		this.width = window.innerWidth;
		this.device = this.width < 500 ? 'mobile' : this.width > 950 ? 'desctop' : 'pad' ;
		this.orientation = this.height < this.width ? 'landscape' : 'portrait' ;
	},
	setVh() {
		let vh = `${this.height / 100}px`;
		document.documentElement.style.setProperty('--vh', vh);
	},
	trigger() {
		this.linked.forEach(f => f());
	},
}
_local.calc();
let currentDevice = _local.device;
// let currentOrientation = '';
let tick = false;

const ViewportLogic = props => {

	_local.setVh();

	useEffect(() => {

		const handleResize = event => {

			_local.calc();

			// conditionallly trigger rerenders and functions in our componenets
			if (!tick && _local.device !== currentDevice) {

				// the frame request and tick are not required here but I want to throttle updates
				window.requestAnimationFrame(() => {

					_local.trigger();

					tick = false;
					currentDevice = _local.device;
				});
				tick = true;
			}
		}

		window.addEventListener( 'resize', handleResize );
	});


	return (
		<>
			{/* lets see if it works with an empty element */}
			{/* Will also try to return 'null' */}
		</>
	);
}

export { ViewportLogic }