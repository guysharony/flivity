import SVG from './SVG';

export default function Heart() {
	return (
		<SVG type='heart'>
			<defs>
				<clipPath id="heart_1">
					<path d="M40,0 L40,40 L0,40 L0,0 L40,0 Z"></path>
				</clipPath>
				<clipPath id="heart_2">
					<path d="M22.1111111,0 C27.0203089,0 31,3.35786438 31,7.5 C31,8.01396699 30.9387267,8.51585895 30.8220073,9.0007592 L31,9 C29.45,14.2963289 27.125,18.6373141 24.025,22.0229556 C20.925,25.408597 18.0833333,28.0676118 15.5,30 C12.9254964,28.1140061 10.0655612,25.4549912 6.92019444,22.0229556 C3.77482764,18.5909199 1.46809616,14.2499347 0,9 L0.177992681,9.0007592 C0.0612732887,8.51585895 0,8.01396699 0,7.5 C0,3.35786438 3.97969111,0 8.88888889,0 C12.4620333,0 14.6009637,1.778866 15.5005435,4.3442591 C16.3990363,1.778866 18.5379667,0 22.1111111,0 Z"></path>
				</clipPath>
			</defs>
			<g clipPath="url(#heart_1)">
				<g transform="translate(4.0 6.0)">
					<g clipPath="url(#heart_2)">
						<path d="M22.1111111,0 C27.0203089,0 31,3.35786438 31,7.5 C31,8.01396699 30.9387267,8.51585895 30.8220073,9.0007592 L31,9 C29.45,14.2963289 27.125,18.6373141 24.025,22.0229556 C20.925,25.408597 18.0833333,28.0676118 15.5,30 C12.9254964,28.1140061 10.0655612,25.4549912 6.92019444,22.0229556 C3.77482764,18.5909199 1.46809616,14.2499347 0,9 L0.177992681,9.0007592 C0.0612732887,8.51585895 0,8.01396699 0,7.5 C0,3.35786438 3.97969111,0 8.88888889,0 C12.4620333,0 14.6009637,1.778866 15.5005435,4.3442591 C16.3990363,1.778866 18.5379667,0 22.1111111,0 Z" stroke="#000000" strokeWidth="2" fill="none" strokeMiterlimit="5"></path>
					</g>
				</g>
			</g>
		</SVG>
	);
}