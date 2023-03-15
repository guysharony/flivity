import { Button, Upload } from 'antd';
import { useRecoilState } from 'recoil';
import { UploadOutlined } from '@ant-design/icons';

import { uploadState } from 'src/atoms/upload.atom';
import UploaderModal from '../Modals/UploaderModal/UploaderModal';

const UploadButton = () => {
	const [, setUpload] = useRecoilState(uploadState);

	const onChange = (event: any) => {
		setUpload(event.file);
	}

	return (
		<>
			<Upload onChange={onChange} showUploadList={false}>
				<Button icon={<UploadOutlined />} shape='round' size='large' className='flex items-center'>
					Upload a video
				</Button>
			</Upload>
			<UploaderModal title='Uploading' />
		</>
	);
}

export default UploadButton;