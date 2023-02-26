import React from 'react';

import { UserResponse } from '@services/core/user/dtos/user-response.dto';

import { trpc } from '../../utils/trpc';

export default function Home() {
	const user = trpc.user.findById.useQuery<unknown, UserResponse>({
		id: '2JMTvYRmISgkAovwzyDbbHm50vN'
	}, {
		retry: false
	});

	if (user.isLoading) {
		return <div><span>Loading...</span></div>
	}

	return (
		<div>
			{
				user.data &&
				<div>
					<span>{`name: ${user.data.name}`}</span>
				</div>
			}
		</div>
	);
}