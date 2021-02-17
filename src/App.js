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

import Home from './Pages/Home';

// nav
import Navigation from './Navigation/Container';

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

const _evilcook = {
	/**
	 * @param {boolean} [ log ] : well, display the console log ofcourse 
	 * <p>  
	 * @param {string , null} [ baseUrl ] : set if you have defined a 'baseUrl' in your jsconfig.json. setting to 'src is very handy, is recommended and will simply remove all './' from imports. null will replace them with '../' and is the simplest solution. if a custom 'url' is set, keep in mind to define the child directory ( i.e if set to 'src', but all your imports go through 'src/components', set baseUrl to 'components'.)
	 * </p>
	 */
	options: {
		log: true,
		baseUrl: 'src',
	}
}
const { baseUrl } = _evilcook.options;
_evilcook.options.importPath = baseUrl === 'src' ? "'" : baseUrl === null ? "'../" : `'${baseUrl}/` ;

// zcm process controll
async function _zcmStart( list ) {

	const response = await fetch(
		copycat,
		/**
		 * DOWN THE LINE:
		 * data of root ( name, directory and everything else )
		 */
		{
			method: "POST",
			headers: {
				    'Content-Type': 'application/json',
				  },
			// body: JSON.stringify(list),
			body: JSON.stringify(list),
		}
	);

	// const data = await response.text();
	const { log, content } = await response.json();

	_evilcook.options.log && log.forEach( entry => console.log(entry));
	console.log(content);
	content.forEach( ( component, index ) => _processComponent( content, component, index ))


}

function _processComponent( content, component, index ) {
	let { importPath } = _evilcook.options;
	content[index].data.code = component.data.code.replace(/'.\//g, importPath);
	console.log(component);
}

let catArray = { catArray: [{ path: 'root', file: 'App.js' }, { path: 'Doormat', file: 'Container.jsx' }] };

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
