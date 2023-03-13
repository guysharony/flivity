import UploadButton from '../../components/UploadButton/UploadButton';

import { IVideosHeader } from "./Videos.header.interface";

const VideosHeader = ({ videos }: IVideosHeader) => {
	return (
		<div className="pb-4">
			<div className="flex py-6 justify-between">
				<div className='flex items-center'>
					<span className="text-2xl font-sans">Videos</span>
				</div>
				<div>
					<UploadButton />
				</div>
			</div>
		</div>
	);
}

export default VideosHeader;