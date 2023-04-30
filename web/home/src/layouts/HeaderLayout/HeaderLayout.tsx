import { Link } from 'react-router-dom';

import logo from 'src/static/logo.png';

import './HeaderLayout.style.css';
import { HeaderLayoutProps } from './HeaderLayout.interface';
import { Button } from 'antd';

export default function HeaderLayout({ setMenu }: HeaderLayoutProps) {
	return (
		<div className='top-0 w-full bg-white' style={{ zIndex: 1000 }}>
			<div className='mx-auto px-4 sm:px-6'>
				<div className='flex items-center justify-between py-2 space-x-10'>
					<div className='flex justify-start lg:w-0 lg:flex-1'>
						<Link to={'/'}>
							<div className='h-10 w-10 rounded-full overflow-hidden'>
								<img src={logo} className='w-full h-full' alt='logo' />
							</div>
						</Link>
					</div>
					<div className='flex justify-end lg:w-0 lg:flex-1 gap-3'>
						<Button size="large" shape='round' href={new URL('/signin', import.meta.env.VITE_APPLICATION_URL).href} type="primary" ghost>Sign in</Button>
					</div>
				</div>
			</div>
		</div>
	);
}