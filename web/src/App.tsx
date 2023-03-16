import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { trpc } from './utils/trpc';
import request from './utils/request';

import MenuLayout from './layouts/MenuLayout/MenuLayout';
import BodyLayout from './layouts/BodyLayout/BodyLayout';
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout';

import './App.css';
import useSession from './hooks/session.hook';

function App() {
	const { session } = useSession();
	const location = useLocation();
	const navigate = useNavigate();
	const [menu, setMenu] = useState<boolean>(false);

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

	React.useEffect(() => {
		if (session && !session.account_configured && (location.pathname !== '/account_configuration')) {
			navigate('/account_configuration');
		}
	}, [location.pathname, navigate, session])

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
