import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import useSession from '../../hooks/session.hook';

import Icons from '../../components/Icons';

import { MenuLayoutProps } from './MenuLayout.interface';

export default function MenuLayout({ menu }: MenuLayoutProps) {
	const location = useLocation();
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
									<Link to={`/${session.username}`} className={`flex px-1 items-center rounded-3xl ${`/${session.username}` === location.pathname ? 'text-white bg-gray-600 stroke-white' : 'text-gray-600 stroke-gray-600 hover:text-white hover:bg-gray-300 hover:stroke-white'} w-52 h-12 text-left`}>
										<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
											<Icons type='profile' />
										</div>
										<span>Profile</span>
									</Link>
									<Link to={`/videos`} className={`flex px-1 items-center rounded-3xl ${`/videos` === location.pathname ? 'text-white bg-gray-600 stroke-white' : 'text-gray-600 stroke-gray-600 hover:text-white hover:bg-gray-300 hover:stroke-white'} w-52 h-12 text-left`}>
										<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
											<Icons type='video' />
										</div>
										<span>Videos</span>
									</Link>
									<Link to={`/settings`} className={`flex px-1 items-center rounded-3xl ${`/settings` === location.pathname ? 'text-white bg-gray-600 fill-white' : 'text-gray-600 fill-gray-600 hover:text-white hover:bg-gray-300 hover:fill-white'} w-52 h-12 text-left`}>
										<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
											<Icons type='settings' />
										</div>
										<span>Settings</span>
									</Link>
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