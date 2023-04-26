import Icons from '../../components/Icons/Icons';

import { MenuLayoutProps } from './MenuLayout.interface';

export default function MenuLayout({ menu, setMenu }: MenuLayoutProps) {
	if (!menu) {
		return null;
	}

	return (
		<div className='h-full right-0 top-0 bg-white'>
			<div className='flex items-center justify-between py-2'>
				<div className='flex flex-col px-4 sm:px-6'>
					<button onClick={setMenu} className='flex px-1 items-center rounded-3xl text-gray-600 stroke-gray-600 text-base w-52 h-12 text-left hover:text-white hover:bg-gray-300 hover:stroke-white'>
						<div className='h-9 w-9 rounded-full overflow-hidden mx-3 stroke-1'>
							<Icons type='logout' />
						</div>
						<span>Logout</span>
					</button>
				</div>
			</div>
		</div>
	)
}