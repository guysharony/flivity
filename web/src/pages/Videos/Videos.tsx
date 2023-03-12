import React from 'react';

import { VideoResponse } from '@packages/core/video/dtos/video-response.dto';

import { trpc } from '../../utils/trpc';
import useSessionContext from '../../hooks/sessionContext.hook';
import QueryLayout from '../../layouts/QueryLayout/QueryLayout';

import VideosHeader from './Videos.header';
import VideosBody from './Videos.body';

export default function Videos() {
	const context = useSessionContext();

	const videos = trpc.video.findByAuthorID.useQuery({ authorID: context.session.id });

	return (
		<QueryLayout queries={[videos]}>
			<VideosHeader
				videos={videos.data as VideoResponse[]} />
			<VideosBody
				videos={videos.data as VideoResponse[]} />
		</QueryLayout>
	)
}