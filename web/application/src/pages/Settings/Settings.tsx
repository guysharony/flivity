import { Card } from 'antd';
import { useState } from 'react';
import withProtection from 'src/hoc/with-protection.hoc';
import General from './components/General/General';
import Account from './components/Account/Account';

function Settings() {
	const [activeTabKey, setActiveTabKey] = useState<string>('general');

	const tabList = [
		{
			key: 'general',
			tab: 'General',
		},
		{
			key: 'account',
			tab: 'Account',
		},
	];

	const contentList: Record<string, React.ReactNode> = {
		general: <General />,
		account: <Account />,
	};

	const onChange = (key: string) => {
		setActiveTabKey(key);
	};

	return (
		<div>
			<Card
				style={{ width: '100%', boxShadow: 'none' }}
				title="Settings"
				bordered={false}
				hoverable={false}
				tabList={tabList}
				activeTabKey={activeTabKey}
				onTabChange={onChange}
				headStyle={{ padding: '0' }}
				bodyStyle={{ padding: '16px 0' }}
			>
				{contentList[activeTabKey]}
			</Card>
		</div>
	);
}

export default withProtection(Settings, { authenticated: true, configured: false });