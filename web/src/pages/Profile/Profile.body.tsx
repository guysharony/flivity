import React from 'react';
import { Outlet } from 'react-router-dom';

import { IProfileBody } from './Profile.body.interface';

const ProfileBody = ({ user }: IProfileBody) => {
	return (
		<div className='flex-auto'>
			<Outlet />
		</div>
	);
}

export default ProfileBody;