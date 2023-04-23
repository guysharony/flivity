import SVG from './SVG';

export default function CloseFullscreen() {
	return (
		<SVG type='closeFullscreen'>
			<defs>
				<clipPath id="closeFullscreen">
					<path d="M26,15 L26,20 L20,20 L20,26 L15,26 L15,15 L26,15 Z M11,15 L11,26 L6,26 L6,20 L0,20 L0,15 L11,15 Z M20,0 L20,6 L26,6 L26,11 L15,11 L15,0 L20,0 Z M11,0 L11,11 L0,11 L0,6 L6,6 L6,0 L11,0 Z"></path>
				</clipPath>
			</defs>
			<g transform="translate(7.0 7.0)">
				<g clipPath="url(#closeFullscreen)">
					<polygon points="0,0 26,0 26,26 0,26 0,0" stroke="none" fill="#FFFFFF"></polygon>
					<path d="M26,15 L26,20 L20,20 L20,26 L15,26 L15,15 L26,15 Z M11,26 L6,26 L6,20 L0,20 L0,15 L11,15 L11,26 Z M26,11 L26,6 L20,6 L20,0 L15,0 L15,11 L26,11 Z M11,0 L6,0 L6,6 L0,6 L0,11 L11,11 L11,0 Z" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeMiterlimit="5"></path>
				</g>
			</g>
		</SVG>
	);
}