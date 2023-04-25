import SVG from './SVG';

export default function Broken() {
	return (
		<SVG type='broken'>
			<defs>
				<clipPath id="broken_1">
					<path d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z"></path>
				</clipPath>
				<clipPath id="broken_2">
					<path d="M2,9 C2.55228475,9 3,9.44771525 3,10 C3,10.5522847 2.55228475,11 2,11 C1.44771525,11 1,10.5522847 1,10 C1,9.44771525 1.44771525,9 2,9 Z M2,0 C3.1045695,0 4,0.8954305 4,2 C4,2.27058503 3.94626549,2.5286197 3.84888529,2.76401517 L3.00194486,7 C3,7.55228475 2.55228475,8 2,8 C1.44771525,8 1,7.55228475 1,7 C1,6.96459713 1.00183972,6.92962395 1.00542879,6.89517085 L0.161623374,2.78893615 C0.0576074543,2.54687837 0,2.28016666 0,2 C0,0.8954305 0.8954305,0 2,0 Z"></path>
				</clipPath>
			</defs>
			<g transform="translate(10.0 10.0)">
				<g clipPath="url(#broken_1)">
					<path d="M10,20 C15.5228475,20 20,15.5228475 20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 Z" strokeWidth="4" fill="none"></path>
				</g>
			</g>
			<g transform="translate(18.0 14.0)">
				<g clipPath="url(#broken_2)">
					<polygon points="0,0 4,0 4,11 0,11 0,0" stroke="none"></polygon>
				</g>
			</g>
		</SVG>
	);
}