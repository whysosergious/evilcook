// /**
//  * Collect hooks, references and other needed data that can be accessed wherever it's imported.
//  * Names, structure and methods are all still WIP. As this is the first iteration of the
//  * the module.
//  */
// import { useEffect, useState } from 'react';

// // global data, references, functions and hooks
// export const globalObj = {};
// globalObj.getOffsets = function(group) {
// 	Object.values(this[group]).forEach( e => e.getOffsetY());
// }
// // blueprint of method object that's copied and merged with the reference object
// const globalObjMethods = {
// 	// ref offset getter
// 	getOffsetY() {
// 		this.offsetY = this.ref.offsetTop;
// 	},
// 	init( group, key, state, dispatch ) {		// initial method with hook assignment
// 		if ( this.ref ) {
// 			this.ref = this.ref.current; 	// element reference
// 			this.ref.zKey = key[0];
// 			this.ref.zEl = this;		// for easy pairing and execution of dispatch with observer ***check memory usage***
// 			this.getOffsetY();
// 		}
// 		this.state = state;		// component 'state'
// 		this.setState = dispatch;		// component hook 'setState'
// 	},
// }

// /**
//  * Global assignment of custom hooks for individual elements
//  * @param {React.ElementRef<HTMLElement>} objectEntry
//  */
// export const useGlobalObj = ( objectEntry, group = null) => {
// 	let key = Object.keys( objectEntry );
// 	const [ state, setState ] = useState(objectEntry[key].initialState || null);	// custom hook
// 	// when components mounts, we create their object entry
// 	// and initialize the object

// 	useEffect(() => {
// 		// we check if the group property is defined and if that group already exist in the global object
// 		globalObj[group || key] = globalObj[group] || {};

// 		Object.assign( objectEntry[key], globalObjMethods );
// 		objectEntry[key].init( group, key, state, setState );
// 		Object.assign( globalObj[group || key], group ? objectEntry : objectEntry[key]  );

// 	}, []);

// 	return [ state, setState ];
// }

// export default useGlobalObj;


// /**
//  * Known issue **
//  *
//  * Currently a few component references are not initialized when root is mounted.
//  * Requiring recalculation of element offsets. And while we can get them every time directly from the
//  * references, those are reads we can spare the browser.
//  * We can otherwise get them individually once at the start, and then on known changes.
//  */