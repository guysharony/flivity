import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { SessionProvider } from './context/session.context';

import './index.css';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import AccountConfiguration from './pages/AccountConfiguration/AccountConfiguration';
import Profile from './pages/Profile/Profile';

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
				path: '/account_configuration',
				element: <AccountConfiguration />
			},
			{
				path: '/:username',
				element: <Profile />,
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
		<SessionProvider>
			<RouterProvider router={router} />
		</SessionProvider>
	</React.StrictMode>,
);

