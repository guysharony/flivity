import React from 'react';
import { Link } from 'react-router-dom';

import useSession from '../../hooks/session.hook';

import logo from '../../static/logo.png';

import './HeaderLayout.style.css';
import { HeaderLayoutProps } from './HeaderLayout.interface';

export default function HeaderLayout({ setMenu }: HeaderLayoutProps) {
	const { session } = useSession();

	return (
		<div className='fixed top-0 w-full bg-white'>
			<div className='mx-auto px-4 sm:px-6'>
				<div className='flex items-center justify-between py-2 space-x-10'>
					<div className='flex justify-start lg:w-0 lg:flex-1'>
						<Link to={'/'}>
							<img src={logo} className='h-10 w-10 rounded-full overflow-hidden' alt='logo' />
						</Link>
					</div>
					<div className='space-x-10 md:flex'>
						<div className='flex items-center h-10 border border-gray-400 px-5 w-80 rounded-3xl overflow-hidden'>
							<input type="text" className='search_input w-full h-full font-light outline-none text-gray-800 text-base' autoCapitalize="none" autoComplete="off" autoCorrect="off" required />
							<label className='absolute pointer-events-none text-gray-500 font-light text-base'>Search</label>
						</div>
					</div>
					<div className='flex justify-end lg:w-0 lg:flex-1 gap-3'>
						{
							session
								? <button className='h-10 w-10 rounded-full overflow-hidden' onClick={() => setMenu()}>
									<img src={`${process.env.REACT_APP_URL}/profiles`} alt='profile' />
								</button>
								: <>
									<Link to={'/signin'} className='flex items-center h-10 px-4 rounded-3xl text-blue-800 border-blue-800 border font-light text-base bg-white'>Sign in</Link>
								</>
						}
					</div>
				</div>
			</div>
		</div>
	);
}