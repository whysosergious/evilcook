/**
 * About, collaboration and import
 */
import React, { useRef } from 'react';
import './Container.css';

// zergski logic
import { useGlobalObj } from 'zergski-global';

// media
import repslagarBackground from 'ass/vector/files/entrance.svg';
import greatBrandsImage from 'ass/img/about/great-brands-import.jpg';
import swedenColabImage from 'ass/img/about/sweden-colab.jpg';
import mainBarImage from 'ass/img/about/main-bar.jpg';
import caskAleImage from 'ass/img/about/cask-ale.jpg';

// components
import ImageWrapper from 'shared/ImageWrapper';

const AboutContainer = props => {
	const About = {
		ref: useRef(null),
		index: 5,
	}
	const AboutHeading = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle bottom',
	}
	const AboutGroup0 = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle',
	}
	const AboutGroup1 = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle',
	}
	const AboutGroup2 = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle',
	}
	const AboutGroup3 = {
		ref: useRef(null),
		index: 0,
		initialState: 'idle',
	}

	const [ state, setState ] = useGlobalObj({ About }, 'Sections');
	const [ headingState ] = useGlobalObj({ AboutHeading }, 'ViewportAnimated');
	const [ group0State ] = useGlobalObj({ AboutGroup0 }, 'ViewportAnimated');
	const [ group1State ] = useGlobalObj({ AboutGroup1 }, 'ViewportAnimated');
	const [ group2State ] = useGlobalObj({ AboutGroup2 }, 'ViewportAnimated');
	const [ group3State ] = useGlobalObj({ AboutGroup3 }, 'ViewportAnimated');


   return (
		<>
			<section className="About-Container" ref={ About.ref }
				style={{ position: 'relative', paddingBottom: '12rem' }}
			>
				<ImageWrapper imgSrc={ repslagarBackground }
					imgDesc="Vector of the outside of the bar at Repslagargatan, Södermalm"
					style={{
						background: 'none',
						position: 'absolute',
						height: '50rem',
						width: 'unset',
						minWidth: '100%',
						objectFit: 'cover',
						top: '0',
						opacity: '.05'
					}}
				/>
				<div className={ `Heading-Group Intro left ${ headingState } va` } ref={ AboutHeading.ref }>
					<h1 className="dark" data-zcm="about.intro.heading">
						It's not complicated
					</h1>
					<h3 className="dark" data-zcm="about.intro.body">
						Tänk dig en pub som kanske inte bara är en pub. Samma känsla av att känna sig välkommen, samma inbjudande atmosfär, men med en känsla av att du klivit in i nåt unikt, nånting annorlunda och speciellt.
						<p>
							När vi öppnade 1993 var Sverige en öken. Av de få öl som fanns var nästan alla öl ljus tråkig lager, och det fanns inte många! Vi tyckte det var direkt fel, och det var tid för förändring. Som du märker har det hänt en del.
						</p>
					</h3>
				</div>

				<div className={ `About-Group right ${ group0State } va` } ref={ AboutGroup0.ref }>
					<div className="Heading-Group right">
						<h2 className="dark" data-zcm="about.import.heading">
							Samarbete<br/>& Import
						</h2>
						<h3 className="dark small" data-zcm="about.import.body">
							Sedan 2008 har vi med stor hjälp av vårt egna importföretag sett till att ha Nordens, om inte Europas starkaste utbud av Amerikansk Craft Beer i våra kylar. Så titta förbi och upptäck varför.
						</h3>
					</div>
					<ImageWrapper imgSrc={ greatBrandsImage }
						imgDesc="Logo of sister import company Great Brands"
					/>
				</div>

				<div className={ `About-Group left ${ group1State } va` } ref={ AboutGroup1.ref }>
					<div className="Heading-Group left">
						<h2 className="dark" data-zcm="about.local.heading">
							Support your<br/>local brewers
						</h2>
						<h3 className="dark small" data-zcm="about.local.body">
							Vi samarbetar nära med Sveriges skickligaste bryggare. Och man hittar allt från nyheter till gamla godingar på både fat och flaska. Många gånger får vi också besök av våra lokala stjärnor.
						</h3>
					</div>
					<ImageWrapper imgSrc={ swedenColabImage }
						imgDesc="Brewers from Swedish Nynäshamn Brewery and American SKA tasting newly brewed beer"
					/>
				</div>
			</section>


			<section className="About-Container dark"
				style={{ paddingTop: '0' }}
			>
				<div className={ `About-Group right ${ group2State } va` } ref={ AboutGroup2.ref }>
					<div className="Heading-Group right">
						<h2 data-zcm="about.service.heading">
							Service i fokus
						</h2>
						<h3 className="small" data-zcm="about.service.body">
							Praesent tristique dui fringilla, blandit nibh eget, tempus tortor. Nam a porta enim. Donec venenatis ligula tortor, eu dictum arcu bibendum id. In sed odio ac turpis sodales facilisis.
						</h3>
					</div>
					<ImageWrapper imgSrc={ mainBarImage }
						imgDesc="Main bar before service"
					/>
				</div>

				<div className={ `About-Group left ${ group3State } va` } ref={ AboutGroup3.ref }>
					<div className="Heading-Group left">
						<h2 data-zcm="about.cask.heading">
							Vi strävar<br/>efter kvalitet
						</h2>
						<h3 className="small" data-zcm="about.cask.body">
							Vår hantering av Real Ale gjorde att vi 2001 fick den brittiska utmärkelsen Cask Marque som första pub utanför de brittiska öarna, en utmärkelse vi fått varje år sedan dess.
						</h3>
					</div>
					<ImageWrapper imgSrc={ caskAleImage }
						imgDesc="Three Real Ale taps with Swedish and Brittish Cask Ale"
					/>
				</div>
			</section>
		</>
   );
}

export default AboutContainer;