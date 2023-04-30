import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

import MenuLayout from './layouts/MenuLayout/MenuLayout';
import BodyLayout from './layouts/BodyLayout/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout';

import './App.css';

function App() {
	const [menu, setMenu] = useState<boolean>(false);

	return (
		<ConfigProvider theme={
			{
				token: {
					colorPrimary: "#004bb5",
					fontSize: 14,
					borderRadius: 6,
				},
				components: {
					Button: {
						colorLink: "#004bb5"
					}
				}
			}}>
			<HeaderLayout setMenu={() => setMenu(!menu)} />
			<div className='flex overflow-hidden flex-auto'>
				<BodyLayout>
					<Outlet />
				</BodyLayout>
				<MenuLayout menu={menu} setMenu={() => setMenu(!menu)} />
			</div>
		</ConfigProvider >
	);
}

export default App;
