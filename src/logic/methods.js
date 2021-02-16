/**
 * recursive function loop.
 * One for arrays and one for Objects.
 * Same name for both types allows for automatic type detection and conversion.
 */

// name our method
const methodName = 'recLoop';

// Check if prototype names are taken
Object.prototype.hasOwnProperty(methodName) && THROW_ERROR('Object');
Array.prototype.hasOwnProperty(methodName) && THROW_ERROR('Array');
function THROW_ERROR ( info ) { throw new Error( `Property name '${ methodName }' clashes with an existing method in ${ info } prototypes` ) }

// referencing objects
const TargetObject = Object;
const TargetArray = Array;

/**
 * We define our properties and handle data types
 * Our functions receive callbacks and if set
 * an int with a loop limit.
 */
Object.defineProperty( TargetObject.prototype, methodName, {
	value: function( callback, limit ) {
		let array = Object.entries(this);	// Object entries are made into arrays

		return iterate( callback, array, limit )	// and we call our recursive function

	}, enumerable: false, writable: true
});
Object.defineProperty(TargetArray.prototype, methodName, {
	value: function( callback, limit ) {
		let array = this;		// arrays are kept as is

		return iterate( callback, array, limit );

	}, enumerable: true, writable: true
});

/**
 * Recursive function that iterates through
 * an array either in full or up to the set
 * limit of iterations
 * @param {function} callback
 * @param {array} array
 * @param {number} limit
 */
function iterate( callback, array, limit=null ) {
	let length = array.length;
	const count = length < limit ? length : limit || length ;	// iteration count
	let i = 0;

	function next() {
		let [ entry, entry2=undefined ] = Array.isArray(array[i]) ? array[i] : [array[i]];
		if ( i++ >= count ) { return }

		// value, index, key because it's seems easier to handle atm
		return ( callback( entry2 || entry, i, entry2 && entry ), next() );
	}	// Give it a push
	next();
}