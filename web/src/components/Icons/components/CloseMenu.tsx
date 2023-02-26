import React from 'react';

import SVG from './SVG';

export default function CloseMenu() {
	return (
		<SVG type='closeMenu'>
			<g transform="translate(10.0 10.0)">
				<path d="M0,0 L20,20 M0,20 L20,0" fill="none" strokeLinecap="round" strokeLinejoin="bevel"></path>
			</g>
		</SVG>
	);
}