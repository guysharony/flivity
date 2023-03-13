import React from 'react';
import { IUploadBody } from './Upload.body.interface';
import { Outlet } from 'react-router-dom';


const UploadBody = ({ video }: IUploadBody) => {
	console.log(video);

	return (
		<div className='flex-auto'>
			<Outlet />
		</div>
	);
}

export default UploadBody;