import { Card } from "antd";

function Account() {
	return (
		<>
			<div className="mb-10">
				<Card type="inner" title="Subscription">
					Free
				</Card>
			</div>
			<Card type="inner" title="Danger zone" headStyle={{ backgroundColor: 'rgb(220 38 38)', borderColor: 'rgb(220 38 38)', color: '#fff' }}>
				Delete my account
			</Card>
		</>
	);
}

export default Account;