import {
	HiCalendar,
	HiCog,
	HiHome,
	HiOutlineOfficeBuilding,
	HiOutlineUser,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

// extending NavList styles
const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}
`;

const MainNav = () => {
	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to='/dashboard'>
						<HiHome />
						<span>Dashboard</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/bookings'>
						<HiCalendar />
						<span>Bookings</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/cabins'>
						<HiOutlineOfficeBuilding />
						<span>Cabins</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/user'>
						<HiOutlineUser />
						<span>Users</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/settings'>
						<HiCog />
						<span>Settings</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
};

export default MainNav;
