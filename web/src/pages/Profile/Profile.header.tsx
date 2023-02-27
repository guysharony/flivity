import { UserResponse } from "@services/core/user/dtos/user-response.dto";

interface IProfileHeader {
	user: Required<UserResponse>;
}

const ProfileHeader = ({ user }: IProfileHeader) => {
	return (
		<div>
			<div>
				<div>

				</div>
				<div>
					<span>{user.displayName}</span>
				</div>
			</div>
		</div>
	);
}

export default ProfileHeader;