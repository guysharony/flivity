export default function SVG({ type, children }: { type: string; children: any }): JSX.Element {
	return (
		<svg style={{ width: '100%', height: '100%' }} viewBox="0 0 40 40" type={type}>
			{children}
		</svg>
	);
};