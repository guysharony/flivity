import { IProfileHeader } from "./Profile.header.interface";
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import Menu from "../../components/Menu/Menu";

const ProfileHeader = ({ user }: IProfileHeader) => {
	return (
		<div className="pb-4">
			<div className="flex py-6">
				<ProfileImage src={user.profilePicture} alt='user' className="w-24" />
				<div className="flex flex-col justify-center pb-2 ml-4">
					<span className="text-2xl font-medium">{user.displayName}</span>
					<span className="text-base text-gray-500 font-normal">{user.username}</span>
				</div>
			</div>
			<Menu
				className='mt-4'
				options={[
					{
						value: `/${user.username}`,
						label: 'Home'
					},
					{
						value: `/${user.username}/about`,
						label: 'About'
					}
				]} />
		</div>
	);
}

export default ProfileHeader;