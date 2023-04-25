import withProtection from 'src/hoc/with-protection.hoc';

function Home() {
	return (
		<div>
			<span>This is home page</span>
		</div>
	);
}

export default withProtection(Home, { authenticated: true, configured: false });