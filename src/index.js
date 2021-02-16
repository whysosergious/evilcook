import React from 'react';
import ReactDOM from 'react-dom';
import 'logic/methods.js';
import './fonts.css';
import './typography.css';
import './index.css';
import './mediaQueries.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
