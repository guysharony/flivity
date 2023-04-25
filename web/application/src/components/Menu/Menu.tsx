import { useLocation, useNavigate } from 'react-router-dom';

import { IMenu } from './Menu.interface';

export default function Menu({ className, options }: IMenu) {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className={`flex gap-2 ${className && className.length > 0 ? ` ${className}` : ''}`}>
			{
				options.map((option) => (
					<button key={option.value} onClick={() => navigate(option.value)} className={`w-24 py-3 flex px-1 items-center justify-center rounded-3xl ${option.value === location.pathname ? 'text-white bg-gray-600 stroke-white' : 'text-gray-600 stroke-gray-600 hover:text-white hover:bg-gray-300 hover:stroke-white'} h-12 text-left`}>
						<span>{option.label}</span>
					</button>
				))
			}
		</div>
	)
}