import styled from 'styled-components';

const StyledFooter = styled.footer`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.2rem;
`;

type FooterProps = {
	children: React.ReactNode;
};
const Footer = ({ children }: FooterProps) => {
	return <StyledFooter>{children}</StyledFooter>;
};

export default Footer;
