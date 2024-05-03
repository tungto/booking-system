import { ReactElement } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	padding: 1.2rem 0px;
`;

const Label = styled.label`
	font-weight: 600;
	font-size: 1.6rem;
`;
const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);
`;

type FormRowVerticalProps = {
	label?: string;
	error?: string;
	children: React.ReactNode;
};
const FormRowVertical = ({ label, children, error }: FormRowVerticalProps) => {
	return (
		<StyledFormRow>
			{label && (
				<Label htmlFor={(children as ReactElement).props.id}>
					{label}
				</Label>
			)}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
};

export default FormRowVertical;
