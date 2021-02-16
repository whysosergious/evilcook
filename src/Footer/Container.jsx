/**
 * Just the footer
 */
import React from 'react';
import './Container.css';

//	components
import Anchor from 'shared/Anchor';

const FooterContainer = props => {
   return (
      <footer className="Footer-Container">
			<div className="Social-Group">
				<Anchor altClass="icon"
					link="instagram.com"
					fileName="instagram.svg"
				/>
				<Anchor altClass="icon"
					link="facebook.com"
					fileName="facebook.svg"
				/>
				<Anchor altClass="icon"
					link="tripadvisor.com"
					fileName="tripadvisor.svg"
				/>
				<Anchor altClass="icon"
					link="google.com"
					fileName="google.svg"
				/>
			</div>
			<div className="Zergski-Group">
				<h5>© <a href="www.zergski.com">zergski.com</a> 2021</h5>
			</div>
      </footer>
   );
}

export default FooterContainer;