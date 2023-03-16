import { Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';

import { IUploaderModal } from './UploaderModal.interface';

const UploaderModal = ({ title, open, setOpen }: IUploaderModal) => {
	const customRequest = ({
		action,
		data,
		file,
		filename,
		headers,
		onError,
		onProgress,
		onSuccess,
		withCredentials
	}: any) => {

	}

	return (
		<Modal
			title={title || 'Upload video'}
			centered
			open={open}
			width={800}
			onCancel={() => setOpen(false)}
			footer={null}
		>
			<Dragger name='file' multiple={true} listType="picture" customRequest={customRequest}>
				<p className="ant-upload-drag-icon">
					<UploadOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
			</Dragger>
		</Modal>
	)
}

export default UploaderModal;