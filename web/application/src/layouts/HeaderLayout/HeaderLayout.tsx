import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";

import useSession from 'src/hooks/session.hook';

import logo from 'src/static/logo.png';

import './HeaderLayout.style.css';
import { HeaderLayoutProps } from './HeaderLayout.interface';

export default function HeaderLayout({ setMenu }: HeaderLayoutProps) {
	const { session } = useSession();

	return (
		<>
			<div className='top-0 w-full bg-white' style={{ zIndex: 1000 }}>
				<div className='mx-auto px-4 sm:px-6'>
					<div className='flex items-center justify-between py-2 space-x-10'>
						<div className='flex justify-start lg:w-0 lg:flex-1'>
							{
								session &&
								<button className='h-9 w-9 mr-4 flex items-center justify-center rounded-full border-none bg-transparent cursor-pointer overflow-hidden' onClick={() => setMenu()}>
									<AiOutlineMenu size={25} />
								</button>
							}
							<Link to={'/'}>
								<div className='h-9 w-9 rounded-full overflow-hidden'>
									<img src={logo} className='w-full h-full' alt='logo' />
								</div>
							</Link>
						</div>
						<div className='space-x-10 md:flex w-full max-w-sm'>
							<Input placeholder='Search' size='large' type='primary' />
						</div>
						<div className='flex justify-end lg:w-0 lg:flex-1 gap-3'>
							{
								!session && <Button size="large" shape='round' href={'/signin'} type="primary" ghost>Sign in</Button>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}