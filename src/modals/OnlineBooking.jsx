import React from 'react';
import './OnlineBooking.css';


const widget = document.createElement('script');
widget.type = 'text/javascript';
widget.async = true;
widget.src = '//book.easytablebooking.com/javascripts/widget/v2/book.js';
document.body.appendChild(widget);

// *** TODO load on click.. not very important as the widget is loaded asynchronously though...***
const OnlineBooking = ({ altClass }) => {
	return(
		<div className={ `Online-Booking ${ altClass }` }>
			<div class="BookingBox" placeid="f6b52" language="se">
				<div class="BookingBoxContent">
				</div>
			</div>
		</div>
	);
}

export default OnlineBooking;