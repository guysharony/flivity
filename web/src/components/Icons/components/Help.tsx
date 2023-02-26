import React from 'react';

import SVG from './SVG';

export default function Help() {
	return (
		<SVG type='help'>
			<defs>
				<clipPath id="help">
					<path d="M1.5,0 C2.32842712,0 3,0.671572875 3,1.5 C3,2.32842712 2.32842712,3 1.5,3 C0.671572875,3 0,2.32842712 0,1.5 C0,0.671572875 0.671572875,0 1.5,0 Z"></path>
				</clipPath>
			</defs>
			<g transform="translate(8.0 8.0)">
				<path d="M12,24 C18.627417,24 24,18.627417 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 Z" fill="none" strokeMiterlimit="5"></path>
			</g>
			<g transform="translate(17.49999999999999 13.000000000000007)">
				<path d="M2.65694174,8.93262907 C2.65694174,7.9947096 2.6401241,7.61977289 2.88643299,7.19604738 C3.29681154,6.49007263 3.89753946,6.29730546 4.16812711,6 C4.47830257,5.65919785 4.97772094,5.16980324 5.41286065,4.25638524 C6.45544029,2.06786741 5.08993837,0 3.15694174,0 C1.76589412,0 0.564383886,0.811506002 0,1.98692904" fill="none" strokeLinecap="round" strokeLinejoin="round"></path>
			</g>
			<g transform="translate(18.5 24.5)">
				<g clipPath="url(#help)">
					<polygon points="0,0 3,0 3,3 0,3 0,0" stroke="none"></polygon>
				</g>
			</g>
		</SVG>
	);
}