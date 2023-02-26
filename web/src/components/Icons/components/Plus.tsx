import React from 'react';

import SVG from './SVG';

export default function Plus() {
	return (
		<SVG type='plus'>
			<g transform="translate(11.5 11.5)">
				<path d="M2,8.5 L15,8.5 M8.5,2 L8.5,15" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
			</g>
			<g transform="translate(8.0 8.0)">
				<path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" fill="none" strokeMiterlimit="5"></path>
			</g>
		</SVG>
	);
}