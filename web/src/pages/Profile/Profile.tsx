import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UserResponse } from '@packages/core/user/dtos/user-response.dto';

import { trpc } from '../../utils/trpc';
import QueryLayout from '../../layouts/QueryLayout/QueryLayout';

import ProfileHeader from './Profile.header';

export default function Profile() {
	const { username } = useParams();
	const navigate = useNavigate();

	if (!username) {
		navigate('/');
		return null;
	}

	const user = trpc.user.findByUsername.useQuery({ username: username });

	return (
		<QueryLayout queries={[user]}>
			<ProfileHeader
				user={user.data as Required<UserResponse>} />
		</QueryLayout>
	)
}