import React from 'react';
import { Outlet } from 'react-router-dom';

import { IVideosBody } from './Videos.body.interface';

const ProfileBody = ({ videos }: IVideosBody) => {
	return (
		<div className='flex-auto'>
			<Outlet />
		</div>
	);
}

export default ProfileBody;