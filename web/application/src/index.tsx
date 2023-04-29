import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { SessionProvider } from './context/session.context';

import './index.css';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/signin',
				element: <Signin />
			},
			{
				path: '/signup',
				element: <Signup />
			},
			{
				path: '/',
				element: <Home />,
			}
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<SessionProvider>
				<RouterProvider router={router} />
			</SessionProvider>
		</RecoilRoot>
	</React.StrictMode>,
);

