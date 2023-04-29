import { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';

import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { trpc } from './utils/trpc';
import request from './utils/request';

import MenuLayout from './layouts/MenuLayout/MenuLayout';
import BodyLayout from './layouts/BodyLayout/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout';

import './App.css';

function App() {
	const [menu, setMenu] = useState<boolean>(true);

	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: '/trpc',
					fetch(url, options) {
						return request.api.call({ isTrpc: true, }, url, options);
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
						<MenuLayout menu={menu} />
						<BodyLayout>
							<Outlet />
						</BodyLayout>
					</div>
				</QueryClientProvider>
			</trpc.Provider>
		</ConfigProvider>
	);
}

export default App;
