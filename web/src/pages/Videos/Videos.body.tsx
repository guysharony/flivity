import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import { IVideosBody } from './Videos.body.interface';

const VideosBody = ({ videos }: IVideosBody) => {
	interface DataType {
		key: React.Key;
		thumbnail: string;
		title: string;
		views: number;
		likes: number;
	}

	const columns: ColumnsType<DataType> = [
		{
			title: 'Thumbnail',
			dataIndex: 'thumbnail',
			width: '0',
			render(thumbnail: string) {
				return (
					<div className='w-40 overflow-hidden rounded'>
						<img src={thumbnail} alt='test' />
					</div>
				)
			}
		},
		{
			title: 'Title',
			dataIndex: 'title',
			width: '50%',
		},
		{
			title: 'Views',
			dataIndex: 'views',
			width: '12%',
			render(views: number) {
				return (
					<span className='whitespace-nowrap'>{`${views} view${views !== 1 ? 's' : ''}`}</span>
				)
			}
		},
		{
			title: 'Likes',
			dataIndex: 'likes',
			width: '12%',
			render(views: number) {
				return (
					<span className='whitespace-nowrap'>{`${views} like${views !== 1 ? 's' : ''}`}</span>
				)
			}
		},
		{
			title: '',
			dataIndex: '',
			width: '0',
			render() {
				return (
					<div className='flex'>
						<Button type="link" icon={<EditOutlined />} size='large' />
						<Button type="link" icon={<DeleteOutlined />} size='large' />
					</div>
				)
			}
		},
	];

	const data: DataType[] = [];
	for (let i = 0; i < 46; i++) {
		data.push({
			key: i,
			thumbnail: `${process.env.REACT_APP_URL}/thumbnail.jpeg`,
			title: `History - Edward King ${i}`,
			likes: 50,
			views: 50
		});
	}

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<div className='flex-auto'>
			<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
		</div>
	);
}

export default VideosBody;