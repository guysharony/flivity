import React from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadButton = () => {
	const onChange = ({ file }: any) => {
		console.log(file);
	}

	return (
		<Upload onChange={onChange} showUploadList={false}>
			<Button icon={<UploadOutlined />} shape='round' size='large' className='flex items-center'>
				Upload a video
			</Button>
		</Upload>
	);
}

export default UploadButton;