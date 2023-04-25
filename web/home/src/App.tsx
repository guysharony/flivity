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
		<ConfigProvider>
			<HeaderLayout setMenu={() => setMenu(!menu)} />
			<div className='flex overflow-hidden flex-auto'>
				<BodyLayout>
					<Outlet />
				</BodyLayout>
				<MenuLayout menu={menu} setMenu={() => setMenu(!menu)} />
			</div>
		</ConfigProvider>
	);
}

export default App;
