import { Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';

import { IUploaderModal } from './UploaderModal.interface';
import { trpc } from 'src/utils/trpc';
import { useState } from 'react';

const chunkSize = 1024 * 1024 * 5;

const UploaderModal = ({ title, open, setOpen }: IUploaderModal) => {
	const [parts, setParts] = useState<number>(0);

	const initialize = trpc.upload.initialize.useMutation();

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

	const onBeforeUpload = async (event: File) => {
		const response = await initialize.mutateAsync({
			name: event.name
		});

		const chunksTotal = Math.ceil(event.size / chunkSize);

		console.log(response);
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
			<Dragger name='file' multiple={false} beforeUpload={onBeforeUpload} customRequest={customRequest}>
				<p className="ant-upload-drag-icon">
					<UploadOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
			</Dragger>
		</Modal>
	)
}

export default UploaderModal;