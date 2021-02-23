// import logo from './logo.svg';
import { useEffect, useRef } from 'react';
import './App.css';
import './AppGeneral.css';
import './animation.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";

// zergski logic
import { useGlobalObj, globalObj, createObserver, queueFrame } from 'zergski-global';
import 'logic/zergski-content-manager';
import { routerHook, useRouterHook } from 'logic/router';

import Home from 'Pages/Home';


// Page Sections
import LandingContainer from './Landing/Container';
import DoormatContainer from './Doormat/Container';
import NewsContainer from './News/Container';
import GalleryContainer from './Gallery/Container';
import MenuContainer from './Menu/Container';
import AboutContainer from './About/Container';
import ContactContainer from './Contact/Container';
import FooterContainer from './Footer/Container';

// Routed pages
import GalleryPage from 'Pages/Gallery/Container';

// Modals
import MediaViewer from 'modals/MediaViewer';
import ModalWindow from 'modals/Window';

// components
import Button from 'shared/Button';
import Anchor from 'shared/Anchor';


// zergski content manager
// copying files before processing 
const copycat = 'http://localhost/brokenOt/evilcook/src/fs/cat.php';


// just some tools..
const z = {
	console: true,
	display: false,
	log (a,b,c,d,e,f) {

		if ( console ) {
			// console.log(a,b,c,d,e,f);
		}
	},
}


// const _evilcook = {
// TEMP
const _evilcook = {
	/**
	 * @param {boolean} [ log ] : well, display the console log ofcourse 
	 * <p>  
	 * @param {string , null} [ baseUrl ] : set if you have defined a 'baseUrl' in your jsconfig.json. setting to 'src is very handy, is recommended and will simply remove all './' from imports. null will replace them with '../' and is the simplest solution. if a custom 'url' is set, keep in mind to define the child directory ( i.e if set to 'src', but all your imports go through 'src/components', set baseUrl to 'components'.)
	 * </p>
	 */
	components: {
		loaded: {
			index: '.js',
		},
		collection: [],
		count: 0,
	},
	options: {
		log: true,
		baseUrl: 'src',
	},
}
const { baseUrl } = _evilcook.options;
_evilcook.options.importPath = baseUrl === 'src' ? "'" : baseUrl === null ? "'../" : `'${baseUrl}/` ;

window.cook = _evilcook;

/**
 * We make copies of all imported and used components
 * @param {Array} list 
 */
async function _zcmStart( list ) {

	const response = await fetch(
		copycat,
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(list),
		}
	);
	const { log, content } = await response.json();

	_evilcook.options.log && log.forEach( entry => console.log(entry));
	
	content.forEach( ( component, index ) => {
		_evilcook.components.collection.push(component);
		_evilcook.components.count++;
		
		_processComponent( content, component, index );
	});
}
let dataa = {};

async function _saveData() {
	console.log(_evilcook.collection);
	const response = await fetch(
		'http://localhost/brokenOt/fw.php',
		{
			method: "POST",
			headers: {
				    'Content-Type': 'application/json',
				  },
			body: JSON.stringify(dataa),
		}
	);

	const data = await response.text();

	console.log(data);

}
setTimeout(()=> {
	_saveData();
	console.log('saved');
}, 1000);



async function _processComponent ( content, component, index ) {
	let { importPath } = _evilcook.options;
	let { rawComponent } = content[index].data;
	let { loaded } = _evilcook.components;


	// just tested by removing comments
	z.log(rawComponent);
	rawComponent = rawComponent.replace(/\B{\/\*\B[\s\S]*\B\*\/}\B/g, '');
	rawComponent = rawComponent.replace(/\B\/\/.*\n/g, '');


	let matches = rawComponent.match(/\B<[A-Z].*\/>\B/g)?.map( res => res.replace(/<|\s+|\/+|>+/g, ''));
	
	let routes = rawComponent.match(/\B<Route.*\/>\B/g)?.map( res => { return res.replace(/^.+{ | }.+$/g, '') });
	let imports = rawComponent.split('import');
	let body = imports.pop();
	// let variables = splitByVariables(body);
	let componentPath = [];
	matches || ( matches = [matches] );
	let keys = [];
	if ( routes ) {
		keys = [ ...routes, ...keys ];
	}
	if ( matches[0] ) {
		let check = [];
		matches.forEach( match => {
			if ( match !== undefined ) {
				if ( loaded[ match ] === match ) {
					z.log( match, 'already processed' );
				} else {
					check.push( match );
				}
			}
		});

		check[0] && ( keys = [ ...check, ...keys ] );
	}
	// if ( variables ) {
	// 	keys = [ ...variables, ...keys ];
	// } 



	imports.forEach( line =>
		keys?.forEach( key => {

			if ( line.includes(key) ) {
				loaded[ key ] = key;
				componentPath.push( line.match(/'.+'|".+"/g)[0].replace(/\.+|"+|'+/g, '').split('/') );
			} else {
				return;
			}
	}));

	Polly.catArray = [];
	filePath = {};
	componentPath.forEach( c => {
		if ( loaded[ c[0] ]?.includes(c[1]) ) {
			console.log( c[1], 'repeated');
		} else {
			// console.log(c);
			c[0] === '' && c.shift();
			filePath = { file: c.pop(), path: c.join('/') === '' ? 'root' : c.join('/') }
			Polly.catArray.push( filePath );
		}
	})



	/**
	 * Now to elements.
	 */
	const staticComponents = [ 'Map', 'root', 'modals' ];

	if ( !staticComponents.includes(component.data.path) ) {



		// const regexp = [
		// 	// /(\B<section\b[\s\S]+?\bsection>\B)/g,
		// 	/(\B<div\b[\s\S]+?\bdiv>\B)/g, 
		// 	/(\B<h1\b[\s\S]+?\bh1>\B)/g, 
		// 	/(\B<h2\b[\s\S]+?\bh2>\B)/g, 
		// 	/(\B<h3\b[\s\S]+?\bh3>\B)/g, 
		// 	/(\B<h4\b[\s\S]+?\bh4>\B)/g, 
		// 	/(\B<h5\b[\s\S]+?\bh5>\B)/g,
		// 	// /(\B<a\b[\s\S]+?\ba>\B)/g,
		// 	// /(\B<button\b[\s\S]+?\bbutton>\B)/g,
		// 	/(\B<Button\b[\s\S]+?\B\/>\B)/g,
		// 	// /(\B<img\b[\s\S]+?\bimg>\B)/g,
		// 	/(\B<nav\b[\s\S]+?\bnav>\B)/g,
		// 	/(\B<span\b[\s\S]+?\bspan>\B)/g,

		// ]


		// let markupArray = rawComponent.replace(/(\n\s+)/g, '').replace(/(>\B)/g, '>|?').replace(/(\B<)/g, '|?<').split('|?');

		// markupArray = markupArray.filter( entry => {
		// 	if ( entry.includes('</') ) return '}';
		// 	if ( /(<([^>]+)>)/i.test(entry) ) return { [entry.replace(/\s?[^\w]+\B.|"|<| /g, '_')] : entry };
		// });
		// // let temp = { ...markupArray }
		// component.data.content = markupArray;
		
		let editable = [];
		
		// let 
		document.querySelectorAll('[data-zcm]').forEach( e => {
			let keys = e.dataset.zcm.split('.');
			let entry = e.innerHTML;
			// data = data[keys[0]] ? data : { [keys[0]]: entry };

			if ( !dataa[keys[0]] ) {
				dataa[keys[0]] = {};
			}
			if ( !dataa[keys[0]][keys[1]] ) {
				dataa[keys[0]][keys[1]] = {};
			}
			if ( keys[2] ) {
				if ( !dataa[keys[0]][keys[1]][keys[2]] ) {
					dataa[keys[0]][keys[1]][keys[2]] = {};
				}
				dataa[keys[0]][keys[1]][keys[2]] = entry;
			} else {
				dataa[keys[0]][keys[1]] = entry;
			}
			
			// for ( let i=keys.length-1; i>=0; i-- ) {
			// 	entry = { [keys[i]]: entry };
			// }

			// data = {  ...data, ...entry };
			// Object.assign(data[keys[0]], entry[keys[0]]);
			// console.log(entry)
			
			editable.push({ inner : e.innerHTML, name: e.dataset.zcm });
		});
		console.log(dataa);
		// let elements = [];
		editable.forEach(e => {
			rawComponent = rawComponent.replace(e.inner, `{ ZCM.${e.name} }`);
		})
		

		console.log(rawComponent);


	}



	Polly.catArray[0] && _zcmStart( Polly );
}

function getImageData( imageNodes, rawComponent ) {
		let result = [];
		imageNodes.forEach( node => {
			let srcVar = node.match(/\b(imgSrc={).*?}\B/g)[0].replace(/(imgSrc={)|\B}.*/g, '').trim();
			let srcVarRegex = '/.*_VARIABLE_.*/g';
			srcVarRegex = srcVarRegex.replace('_VARIABLE_', srcVar);
			let source = rawComponent.match(srcVarRegex)[0].match(/\B['\\"][\s\S].*['\\"]\B/g)[0];
			let description = node.match(/\b(imgDesc=).*/g)[0].replace(/\b(imgDesc=)/g, '');
			
			let image = {
				source,
				description,
			}
			result.push(image);
		});
		return result;
}

function splitByVariables(source) {
	var splitters = [ 'const', 'let', 'var' ];
  splitters.push([source]);

  return splitters.reduceRight(function(accumulator, curValue) {
    var k = [];
    accumulator.forEach(v => k = [...k, ...v.split(curValue)]);
    return k;
  });
}






// we start with index.js
let filePath = {};
let Polly = { catArray: [ { file: 'index', path: 'root' }]};

_zcmStart( Polly );

/**
 * Assigned handler with a properties object
 * TODO!: Document props passed to this function and
 * send all of them separately
 * @param {*} props
 */
const handleNavigation = ({ entry, observer }) => {
	if ( entry.target.zKey === 'Nav' && entry.isIntersecting ) {
		globalObj.Sections.Nav.setState({ sticky: 'stuck' });
	} else if ( entry.target.zKey === 'Nav' && !entry.isIntersecting ) {
		globalObj.Sections.Nav.setState({ sticky: '' });
	}
}

const handleViewportAnimated = ({ entry, observer, prevRatio }) => {
	// console.log(entry.target.zKey, entry.isIntersecting)
	if ( entry.isIntersecting ) {
		queueFrame(() => {
			entry.target.zEl.setState( '' );
		});
		observer.unobserve( entry.target );
	}
}

const App = () => {
	const [ route ] = useRouterHook(null);

	const main = {
		root: useRef(null),
		ref: useRef(null),
	}

	useEffect(() => {
		// for the global object to be accessible through import, it has to be initialized
		// after a 'componentDidMount' or 'useEffect' in that component
		const { Sections, ViewportAnimated } = globalObj;
		globalObj.Sections.Nav.current = 0;
		main.ref = main.ref.current;
		main.root = main.ref.parentElement;
		globalObj.main = main;
		// all you need to create an intersectionObserver
		// a reference of to the observer, in our case
		// the root element
		createObserver (
			'ViewportAnimation',
			main.root,	// observer
			Object.values(ViewportAnimated).map( e => { return e.ref }),
			handleViewportAnimated,	// callback function
			['-20% 0px -20% 0px'],
			1
		);
		createObserver (
			'Navigation',
			main.root,	// observer
			Sections.Nav.ref,
			handleNavigation,	// callback function
			['0px 0px -99% 0px'],
			1
		);

		// window.onclick = e => {
		// 	console.log(e.target);
		// 	console.log(e.target.inerHtml)
		// }
	}, []);

	return (



			<main className="App" ref={ main.ref }>
				{/* <LandingContainer />
				<Navigation />
				<header className="App-header">
					<Anchor altClass="icon"
						link="none"
						fileName="otlogo-white-simple.svg"
						style={{ marginRight: 'auto', height: '2.4rem' }}
					/>

					<Button altClass="minimal lang"
						text="Eng."
						clicked={ '' }
					/>
				</header>

				<DoormatContainer />
				<NewsContainer />
				<GalleryContainer />
				<MenuContainer />
				<AboutContainer />
				<ContactContainer />
				<FooterContainer />

				<MediaViewer />
				<ModalWindow /> */}
				<Router>
		{ route ? <Redirect to={ route } /> : '' }
		 	<Route path="/" component={ Home } />
      	<Route path="/gallery" component={ GalleryPage } />
		</Router>

			</main>

	);
}

export default App;
