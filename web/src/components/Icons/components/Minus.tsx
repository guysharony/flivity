import React from 'react';

import SVG from './SVG';

export default function Minus() {
	return (
		<SVG type='minus'>
			<g transform="translate(11.5 19.5)">
				<path d="M2,0.5 L15,0.5" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
			</g>
			<g transform="translate(8.0 8.0)">
				<path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" fill="none" strokeMiterlimit="5"></path>
			</g>
		</SVG>
	);
}