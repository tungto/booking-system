import styled, { css } from 'styled-components';

type RowProps = {
	type: 'horizontal' | 'vertical';
};

const defaultProps: RowProps = {
	type: 'horizontal',
};

const Row = styled.div<RowProps>`
	display: flex;
	${(props) =>
		(props.type == 'horizontal' || !props.type) &&
		css`
			justify-content: space-between;
			align-items: center;
		`}

	${(props) =>
		props.type === 'vertical' &&
		css`
			flex-direction: column;
			gap: 1.6rem;
		`}
`;

Row.defaultProps = defaultProps;

export default Row;
