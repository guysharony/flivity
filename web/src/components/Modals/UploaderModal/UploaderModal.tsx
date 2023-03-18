import { Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';

import { IUploaderModal } from './UploaderModal.interface';
import { trpc } from 'src/utils/trpc';
import { useState } from 'react';

const UploaderModal = ({ title, open, setOpen }: IUploaderModal) => {
	const [parts, setParts] = useState<number>(0);

	const initialize = trpc.upload.initialize.useMutation();
	const presigned = trpc.upload.presigned.useMutation();
	const complete = trpc.upload.complete.useMutation();

	const uploadChunks = async (id: string, file: File) => {
		const chunkSize = 1000000;

		let start = 0;
		let part = 0;

		const uploadResponses = [];

		for (let i = 0; i < file.size; i += chunkSize) {
			part++;

			// Get the chunk data and create a Blob for it
			const chunk = file.slice(i, i + part);
			const blob = new Blob([chunk], { type: file.type });

			const { url, fields } = await presigned.mutateAsync({
				filename: file.name,
				id: id,
				filetype: file.type,
				part: part,
				filesize: file.size,
				partsize: chunkSize
			});

			const formData = new FormData();
			Object.entries(fields).forEach(([key, value]) => {
				formData.append(key, value);
			});
			formData.append("file", blob);

			const response = await fetch(url, {
				method: "POST",
				body: formData,
			});

			const ETag = response.headers.get('ETag')!;

			uploadResponses.push({
				ETag: ETag,
				PartNumber: part,
			});

			await new Promise((resolve) => {
				setTimeout(resolve, 1000 / 1);
			});
		}

		return uploadResponses;
	}

	const customRequest = async ({
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
		const created = await initialize.mutateAsync({
			filename: file.name as string
		});

		const parts = await uploadChunks(created.id, file);

		const response = await complete.mutateAsync({
			id: created.id,
			filename: file.name as string,
			parts: parts
		});

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
			<Dragger name='file' multiple={false} customRequest={customRequest}>
				<p className="ant-upload-drag-icon">
					<UploadOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
			</Dragger>
		</Modal>
	)
}

export default UploaderModal;