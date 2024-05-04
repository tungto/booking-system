import { useDarkMode } from '@/context/DarkModeContext';
import styled from 'styled-components';

const StyledLogo = styled.div`
	height: 12.6rem;
	img {
		height: 100%;
		margin: auto;
		display: block;
	}
`;
const Logo = () => {
	const { isDarkMode } = useDarkMode();
	const src = isDarkMode
		? './img/logo-dark-mode.jpg'
		: './img/logo-light-mode.jpg';

	return (
		<StyledLogo>
			<img src={src} alt='logo' />
		</StyledLogo>
	);
};

export default Logo;
