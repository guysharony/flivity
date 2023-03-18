import { Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { UploadOutlined } from '@ant-design/icons';

import { IUploaderModal } from './UploaderModal.interface';
import { trpc } from 'src/utils/trpc';
import { useState } from 'react';

const chunkSize = 1000000;

const UploaderModal = ({ title, open, setOpen }: IUploaderModal) => {
	const [parts, setParts] = useState<number>(0);

	const initialize = trpc.upload.initialize.useMutation();
	const presigned = trpc.upload.presigned.useMutation();
	const complete = trpc.upload.complete.useMutation();

	const convertToChunks = async (file: File, callback: (chunk: Blob, index: number) => Promise<any>) => {
		const chunks = Math.ceil(file.size / chunkSize);
		let chunkIndex = 0;

		const parts = [];

		while (chunkIndex < chunks) {
			const start = chunkIndex * chunkSize;
			const end = Math.min(file.size, (chunkIndex + 1) * chunkSize);
			const chunk = file.slice(start, end);

			const response = await callback(chunk, chunkIndex + 1);

			parts.push(response);
			chunkIndex++;
		}

		return parts;
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

		const parts = await convertToChunks(file, async (chunk: Blob, index: number) => {
			const { url } = await presigned.mutateAsync({
				part: index,
				filename: file.name,
				id: created.id
			})

			const headers = new Headers();
			headers.append("Content-Type", "application/octet-stream");

			const response = await fetch(url, {
				method: "PUT",
				headers: headers,
				body: chunk,
			});

			const ETag = response.headers.get('etag')!;

			return {
				ETag: ETag.substring(1, ETag.length - 1),
				PartNumber: index
			}
		});

		console.log(parts);

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