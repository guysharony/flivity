import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';

import useSession from '../../hooks/session.hook';

import { MenuLayoutProps } from './MenuLayout.interface';

export default function MenuLayout({ menu, setMenu }: MenuLayoutProps) {
	const location = useLocation();
	const { session } = useSession();

	if (!menu) {
		return null;
	}

	return (
		<div className='h-full right-0 top-0 bg-white'>
			<div className='flex items-center justify-between py-2'>
				<div className='flex flex-col px-2'>
					{
						session &&
						<>
							<Link to={`/settings`} onClick={setMenu} className={`flex px-1 items-center rounded-3xl ${`/settings` === location.pathname ? 'text-white bg-gray-600 fill-white' : 'text-gray-600 fill-gray-600 hover:text-white hover:bg-gray-300 hover:fill-white'} w-52 h-12 text-left`}>
								<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
									<AiOutlineSetting size={25} />
								</div>
								<span>Settings</span>
							</Link>
							<button onClick={setMenu} className='flex px-1 items-center rounded-3xl text-gray-600 stroke-gray-600 text-base w-52 h-12 text-left hover:text-white hover:bg-gray-300 hover:stroke-white'>
								<div className='h-9 w-9 flex items-center justify-center overflow-hidden mx-3 mr-5 stroke-1'>
									<AiOutlineLogout size={25} />
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