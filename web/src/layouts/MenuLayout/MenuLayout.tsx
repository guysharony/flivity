import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import useSession from '../../hooks/session.hook';

import Icons from '../../components/Icons';

import { MenuLayoutProps } from './MenuLayout.interface';

const MenuItem = ({ to, icon, label }: any) => {
	const location = useLocation();

	return (
		<Link to={to} className={`flex px-1 items-center rounded-3xl ${to === location.pathname ? 'text-white bg-gray-600 stroke-white' : 'text-gray-600 stroke-gray-600 hover:text-white hover:bg-gray-300 hover:stroke-white'} w-52 h-12 text-left`}>
			<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
				<Icons type={icon} />
			</div>
			<span>{label}</span>
		</Link>
	);
}

export default function MenuLayout({ menu }: MenuLayoutProps) {
	const { session } = useSession();

	if (!menu) {
		return null;
	}

	return (
		<div className='fixed h-full mt-14 right-0 top-0'>
			<div className='flex items-center justify-between py-2'>
				<div className='flex flex-col px-4 sm:px-6'>
					{
						session &&
						<>
							{
								session.account_configured &&
								<>
									<MenuItem to={`/${session.username}`} icon='profile' label='Profile' />
									<MenuItem to={`/videos`} icon='video' label='Videos' />
									<MenuItem to={`/settings`} icon='settings' label='Settings' />
								</>
							}
							<button className='flex px-1 items-center rounded-3xl text-gray-600 stroke-gray-600 text-base w-52 h-12 text-left hover:text-white hover:bg-gray-300 hover:stroke-white'>
								<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
									<Icons type='logout' />
								</div>
								<span>Logout</span>
							</button>
						</>
					}
				</div>
			</div>
		</div>
	)
}