import React from 'react';
import { Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { IUploaderModal } from './UploaderModal.interface';

const { Dragger } = Upload;

const UploaderModal = ({ title, open }: IUploaderModal) => {
	const onChange = (info: any) => {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}

		if (status === 'done') {
			console.log(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			console.log(`${info.file.name} file upload failed.`);
		}
	}

	return (
		<Modal
			title={title || 'Upload video'}
			centered
			open={open}
			width={800}
			footer={null}
		>
			<Dragger name='video' multiple={false} maxCount={1} listType="picture" className="upload-list-inline" onChange={onChange}>
				<div className='py-5'>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Click or drag file to this area to upload</p>
				</div>
			</Dragger>
		</Modal>
	)
}

export default UploaderModal;