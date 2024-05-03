import LoginForm from '@/features/authentication/LoginForm';
import Heading from '@/ui/Heading';
import Logo from '@/ui/Logo';
import styled from 'styled-components';

const StyledLogin = styled.div`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 48rem;
	align-content: center;
	justify-content: center;
	gap: 3.2rem;
	background-color: var(--color-grey-50);
`;

const LoginHeading = styled(Heading)`
	margin: auto;
`;

const Login = () => {
	return (
		<StyledLogin>
			<Logo />
			<LoginHeading as='h3'>Log in to your account</LoginHeading>
			<LoginForm />
		</StyledLogin>
	);
};

export default Login;
