import Avatar from '@/ui/Avatar';
import styled from 'styled-components';
import useUser from './useUser';

const StyledAvatar = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
`;

const UserAvatar = () => {
	const { user } = useUser();
	return (
		<StyledAvatar>
			<Avatar
				src={user?.user_metadata.avatar || './img/default-user.jpg'}
				alt={`Avatar of ${user?.user_metadata.fullName}`}
			/>
			<span>{user?.user_metadata.fullName}</span>
		</StyledAvatar>
	);
};

export default UserAvatar;
