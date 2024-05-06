import GlobalStyles from '@/styles/GlobalStyles';
import Button from './Button';
import Heading from './Heading';
import styled from 'styled-components';

const StyledErrorFallBack = styled.main`
	margin: auto;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1.6rem;
`;
type ErrorFallBackProps = {
	onReset: () => void;
};

const ErrorFallBack = ({ onReset }: ErrorFallBackProps) => {
	return (
		<StyledErrorFallBack>
			<GlobalStyles />
			<Heading as='h2'>Sth went wrong!</Heading>
			<Button onClick={onReset}>Try again</Button>
		</StyledErrorFallBack>
	);
};

export default ErrorFallBack;
