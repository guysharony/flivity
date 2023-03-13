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
import ProfileHome from './pages/Profile/components/ProfileHome/ProfileHome';
import ProfileVideos from './pages/Profile/components/ProfileVideos/ProfileVideos';
import ProfileAbout from './pages/Profile/components/ProfileAbout/ProfileAbout';
import Videos from './pages/Videos/Videos';
import Upload from './pages/Upload/Upload';
import UploadDetails from './pages/Upload/components/UploadDetails/UploadDetails';
import UploadVisibility from './pages/Upload/components/UploadVisibility/UploadVisibility';

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
				path: '/videos',
				element: <Videos />
			},
			{
				path: '/upload/:videoID',
				element: <Upload />,
				children: [
					{
						path: '/upload/:videoID',
						element: <UploadDetails />,
					},
					{
						path: '/upload/:videoID/visibility',
						element: <UploadVisibility />,
					}
				]
			},
			{
				path: '/:username',
				element: <Profile />,
				children: [
					{
						path: '/:username',
						element: <ProfileHome />,
					},
					{
						path: '/:username/videos',
						element: <ProfileVideos />,
					},
					{
						path: '/:username/about',
						element: <ProfileAbout />,
					},
				]
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

