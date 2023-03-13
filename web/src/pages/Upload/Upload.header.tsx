import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { IUploadHeader } from "./Upload.header.interface";

const UploadHeader = ({ video }: IUploadHeader) => {
	return (
		<div className="pb-4">
			<div className="flex py-6 justify-between">
				<div className='flex items-center'>
					<span className="text-2xl font-sans">{video.title}</span>
				</div>
				<div>
					<Button icon={<UploadOutlined />} shape='round' size='large' className='flex items-center'>
						Continue
					</Button>
				</div>
			</div>
		</div>
	);
}

export default UploadHeader;