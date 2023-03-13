import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { IVideosHeader } from "./Videos.header.interface";

const VideosHeader = ({ videos }: IVideosHeader) => {
	return (
		<div className="pb-4">
			<div className="flex py-6 justify-between">
				<div className='flex items-center'>
					<span className="text-2xl font-sans">Videos</span>
				</div>
				<div>
					<Button icon={<UploadOutlined />} shape='round' size='large' className='flex items-center'>
						Upload a video
					</Button>
				</div>
			</div>
		</div>
	);
}

export default VideosHeader;