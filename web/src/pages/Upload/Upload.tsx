import { useParams } from 'react-router-dom';

import { VideoResponse } from '@packages/core/video/dtos/video-response.dto';

import { trpc } from 'src/utils/trpc';
import QueryLayout from 'src/layouts/QueryLayout/QueryLayout';

import UploadsHeader from './Upload.header';
import UploadBody from './Upload.body';

export default function Upload() {
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