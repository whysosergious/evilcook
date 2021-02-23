/**
 * Business hours component to display in multiple places
 */
import React, { useState } from 'react';
import './Container.css';

// contexts
// import { kernel } from 'logic/kernel';

// components
import Button from 'shared/Button';
import Day from './Day';
import HoursMessage from './Message';


const BusinessHours = ({ altClass }) => {
	const [ state, setState ] = useState('regular');

	const handleClick = value => {
		setState(value);
	}

   return (
		<div className={ `Business-Hours ${ altClass }` }>
			<h2 className="headline" data-zcm="hours.heading">Våra Öppettider</h2>
			<div className="Hours-Container">
				<div className={ `Regular-Hours ${ state === 'regular' ? '' : 'idle' } va` }>
					<Day day={ `Måndag` } hours= { `13 - 20` } />
					<Day day={ `Tisdag` } hours= { `13 - 20` } />
					<Day day={ `Onsdag` } hours= { `13 - 20` } />
					<Day day={ `Torsdag` } hours= { `13 - 20` } />
					<Day day={ `Fredag` } hours= { `13 - 20` } />
					<Day day={ `Lördag` } hours= { `13 - 20` } />
					<Day day={ `Söndag` } hours= { `13 - 20` } />
				</div>

				<div className={ `Irregular-Hours ${ state === 'irregular' ? '' : 'idle' } va` }>
					<Day day={ `Påskafton 14/4` } hours= { `Stängt` } />
					<Day day={ `Påskdagen 15/4` } hours= { `14 - 20` } />
					<Day day={ `Annandag Påsk 16/4` } hours= { `11 - 20` } />
					<HoursMessage text={ `Pga Covid-19 Stänger vi kl 20 alla dagar, för att regeringen är fullständing dumma i huvudet!` } />
					<Day day={ `Midsommarafton 17/6` } hours= { `Stängt` } />
					<Day day={ `Midsommardagen 18/6` } hours= { `Dygnet Runt` } />
				</div>
			</div>

			<div className="Button-Group">
				<Button altClass="conditional small underline"
					text={ 'Regulära' }
					textColor={ state === 'regular' ? 'white' : '' }
					clicked={ ()=>handleClick('regular') }
				/>
				<Button altClass="conditional small underline"
					text={ 'Avvikande' }
					textColor={ state === 'irregular' ? 'white' : '' }
					clicked={ ()=>handleClick('irregular') }
				/>
			</div>
		</div>
   );
}

export default BusinessHours;