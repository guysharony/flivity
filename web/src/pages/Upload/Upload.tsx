import React from 'react';
import { useParams } from 'react-router-dom';

import { VideoResponse } from '@packages/core/video/dtos/video-response.dto';

import { trpc } from '../../utils/trpc';
import useSessionContext from '../../hooks/sessionContext.hook';
import QueryLayout from '../../layouts/QueryLayout/QueryLayout';

import UploadsHeader from './Upload.header';
import UploadBody from './Upload.body';

export default function Upload() {
	const context = useSessionContext();
	const { videoID } = useParams();

	if (!videoID) {
		return null;
	}

	const videos = trpc.video.findById.useQuery({ id: videoID });

	return (
		<QueryLayout queries={[videos]}>
			<UploadsHeader
				video={videos.data as VideoResponse} />
			<UploadBody
				video={videos.data as VideoResponse} />
		</QueryLayout>
	)
}