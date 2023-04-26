import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { trpc } from './utils/trpc';

import MenuLayout from './layouts/MenuLayout/MenuLayout';
import BodyLayout from './layouts/BodyLayout/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout';

import './App.css';

function App() {
	const [menu, setMenu] = useState<boolean>(false);

	console.log(import.meta.env);

	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: '/trpc',
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: 'include',
						});
					},
					headers() {
						return {
							Authorization: `Bearer thisisatoken`,
							Accept: 'application/json, text/plain, /*',
						};
					},
				}),
			],
		}),
	);

	return (
		<ConfigProvider>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<HeaderLayout setMenu={() => setMenu(!menu)} />
					<div className='flex overflow-hidden flex-auto'>
						<BodyLayout>
							<Outlet />
						</BodyLayout>
						<MenuLayout menu={menu} setMenu={() => setMenu(!menu)} />
					</div>
				</QueryClientProvider>
			</trpc.Provider>
		</ConfigProvider>
	);
}

export default App;
