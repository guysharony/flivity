import { Modal } from 'antd';
import { useRecoilState } from 'recoil';
import { UploadOutlined } from '@ant-design/icons';

import { uploadState } from 'src/atoms/upload.atom';

import { IUploaderModal } from './UploaderModal.interface';

const UploaderModal = ({ title }: IUploaderModal) => {
	const [upload, setUpload] = useRecoilState(uploadState);

	if (!upload) {
		return null;
	}

	return (
		<Modal
			title={title || 'Upload video'}
			centered
			open={true}
			width={800}
			onCancel={() => setUpload(undefined)}
			footer={null}
		>
			<UploadOutlined />
			<span>{`Uploading => ${upload.name}`}</span>
		</Modal>
	)
}

export default UploaderModal;