import styled from 'styled-components';

const Logo = () => {
	const StyledLogo = styled.div`
		height: 12.6rem;
		img {
			height: 100%;
			margin: auto;
			display: block;
		}
	`;
	return (
		<StyledLogo>
			<img src='./img/logo.jpg' alt='logo' />
		</StyledLogo>
	);
};

export default Logo;
