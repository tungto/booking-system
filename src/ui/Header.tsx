import styled from 'styled-components';
import Button from './Button';
import useLogout from '@/features/authentication/useLogout';

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-grey-100);

	display: flex;
	gap: 2.4rem;
	align-items: center;
	justify-content: flex-end;
`;

const Header = () => {
	const { isPending, logoutPerform } = useLogout();

	function handleLogout() {
		logoutPerform();
	}

	return (
		<StyledHeader>
			<Button onClick={handleLogout} disabled={isPending}>
				Logout
			</Button>
		</StyledHeader>
	);
};

export default Header;
