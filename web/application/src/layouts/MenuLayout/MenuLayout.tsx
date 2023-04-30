import { AiOutlineLogout, AiOutlineSetting, AiOutlineHome, AiOutlineComment } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';

import useSession from '../../hooks/session.hook';

import { MenuLayoutProps } from './MenuLayout.interface';

export default function MenuLayout({ menu }: MenuLayoutProps) {
	const location = useLocation();
	const { session } = useSession();

	if (!menu || !session) {
		return null;
	}

	return (
		<div className='flex h-full right-0 top-0 bg-white'>
			<div className='flex flex-col items-center justify-between py-2'>
				<div className='flex flex-col gap-1 px-2'>
					<Link to={`/`} className={`flex px-1 items-center rounded-3xl ${`/` === location.pathname ? 'text-white bg-gray-600 fill-white' : 'text-gray-600 fill-gray-600 hover:text-white hover:bg-gray-300 hover:fill-white'} w-52 h-12 text-left`}>
						<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
							<AiOutlineHome size={25} />
						</div>
						<span>Home</span>
					</Link>
					<Link to={`/comments`} className={`flex px-1 items-center rounded-3xl ${`/comments` === location.pathname ? 'text-white bg-gray-600 fill-white' : 'text-gray-600 fill-gray-600 hover:text-white hover:bg-gray-300 hover:fill-white'} w-52 h-12 text-left`}>
						<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
							<AiOutlineComment size={25} />
						</div>
						<span>Comments</span>
					</Link>
				</div>
				<div className='flex mt-auto flex-col gap-1 px-2'>
					<Link to={`/settings`} className={`flex px-1 items-center rounded-3xl ${`/settings` === location.pathname ? 'text-white bg-gray-600 fill-white' : 'text-gray-600 fill-gray-600 hover:text-white hover:bg-gray-300 hover:fill-white'} w-52 h-12 text-left`}>
						<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
							<AiOutlineSetting size={25} />
						</div>
						<span>Settings</span>
					</Link>
					<button className='flex px-1 items-center rounded-3xl text-gray-600 stroke-gray-600 text-base w-52 h-12 text-left hover:text-white hover:bg-gray-300 hover:stroke-white'>
						<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
							<AiOutlineLogout size={25} />
						</div>
						<span>Logout</span>
					</button>
				</div>
			</div>
		</div>
	)
}