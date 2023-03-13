import React, { useState } from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import UploaderModal from '../Modals/UploaderModal/UploaderModal';

const UploadButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button icon={<UploadOutlined />} onClick={() => setOpen(true)} shape='round' size='large' className='flex items-center'>
				Upload a video
			</Button>
			<UploaderModal open={open} setOpen={setOpen} />
		</>
	);
}

export default UploadButton;