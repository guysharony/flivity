import withProtection from 'src/hoc/with-protection.hoc';

function Comments() {
	return (
		<div>
			<span>This is comments page</span>
		</div>
	);
}

export default withProtection(Comments, { authenticated: true, configured: false });