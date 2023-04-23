import { UserResponse } from '@packages/core/user/dtos/user-response.dto';

import { trpc } from '../../utils/trpc';
import withProtection from 'src/hoc/with-protection.hoc';

function Home() {
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
					<span>{`name: ${user.data.email}`}</span>
				</div>
			}
		</div>
	);
}

export default withProtection(Home, { authenticated: true, configured: false });