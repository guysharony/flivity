import withProtection from 'src/hoc/with-protection.hoc';

function Settings() {
	return (
		<div>
			<span>This is settings page</span>
		</div>
	);
}

export default withProtection(Settings, { authenticated: true, configured: false });