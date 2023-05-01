import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

import BodyLayout from './layouts/BodyLayout/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout';

import './App.css';

function App() {
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
			<HeaderLayout />
			<div className='flex overflow-hidden flex-auto'>
				<BodyLayout>
					<Outlet />
				</BodyLayout>
			</div>
		</ConfigProvider >
	);
}

export default App;
