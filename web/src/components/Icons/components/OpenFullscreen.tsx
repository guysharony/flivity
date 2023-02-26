import React from 'react';

import SVG from './SVG';

export default function OpenFullscreen() {
	return (
		<SVG type='openFullscreen'>
			<defs>
				<clipPath id="openFullscreen">
					<path d="M26,15 L26,26 L15,26 L15,21 L21,21 L21,15 L26,15 Z M5,15 L5,21 L11,21 L11,26 L0,26 L0,15 L5,15 Z M26,0 L26,11 L21,11 L21,5 L15,5 L15,0 L26,0 Z M11,0 L11,5 L5,5 L5,11 L0,11 L0,0 L11,0 Z"></path>
				</clipPath>
			</defs>
			<g transform="translate(7.0 7.0)">
				<g clipPath="url(#openFullscreen)">
					<polygon points="0,0 26,0 26,26 0,26 0,0" stroke="none" fill="#FFFFFF"></polygon>
					<path d="M15,26 L15,21 L21,21 L21,15 L26,15 L26,26 L15,26 Z M0,15 L5,15 L5,21 L11,21 L11,26 L0,26 L0,15 Z M15,0 L15,5 L21,5 L21,11 L26,11 L26,0 L15,0 Z M0,11 L5,11 L5,5 L11,5 L11,0 L0,0 L0,11 Z" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeMiterlimit="5"></path>
				</g>
			</g>
		</SVG>
	);
}