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
	}
}
const { baseUrl } = _evilcook.options;
_evilcook.options.importPath = baseUrl === 'src' ? "'" : baseUrl === null ? "'../" : `'${baseUrl}/` ;

window.cook = _evilcook;

/**
 * We make copies of all imported and used components
 * @param {Array} list 
 */
async function _zcmStart( list ) {
	console.log(list);
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

async function _processComponent ( content, component, index ) {
	let { importPath } = _evilcook.options;
	let { code } = content[index].data;
	let { loaded } = _evilcook.components;

	component.data.name === 'Home' && console.log(code);

	let matches = code.match(/<[A-Z].*\/>/g)?.map( res => res.replace(/<|\s+|\/+|>+/g, ''));
	
	let routes = code.match(/<Route.*\/>/g)?.map( res => { return res.replace(/^.+{ | }.+$/g, '') });
	let imports = code.split('import');
	let body = imports.pop();
	let variables = splitByVariables(body);
	let componentPath = [];
	matches || ( matches = [matches] );
	let keys = [];
	if ( routes ) {
		keys = [ ...routes, ...keys ];
	}
	if ( matches[0] ) {
		let check = [];
		console.log( matches );
		matches.forEach( match => {
			if ( match !== undefined ) {
				if ( loaded[ match ] === match ) {
					console.log( match, 'repeated');
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

	catArray.catArray = [];
	// filePath = {};
	componentPath.forEach( c => {
		if ( loaded[ c[0] ]?.includes(c[1]) ) {
			console.log( c[1], 'repeated');
		} else {
			console.log(c);
			c[0] === '' && c.shift();
			filePath = { file: c.pop(), path: c.join('/') === '' ? 'root' : c.join('/') }
			catArray.catArray.push( filePath );
		}
	})
	// catArray.catArray.pop();
	// console.log(catArray.catArray[0]);
	catArray.catArray[0] && _zcmStart( catArray );
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
let catArray = { catArray: [ { file: 'index', path: 'root' }]};

_zcmStart( catArray );

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
