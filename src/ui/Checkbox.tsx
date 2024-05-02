import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	gap: 1.6rem;
	& input[type='checkbox']:disabled {
		accent-color: var(--color-brand-600);
	}

	& label {
		flex: 1;

		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
	& input {
		height: 2.4rem;
		width: 2.4rem;
		outline-offset: 2px;
	}
`;

type CheckboxProps = {
	label: string;
	disabled: boolean;
	onChange: () => void;
	id: string;
	checked?: boolean;
};
const Checkbox = ({
	label,
	disabled,
	onChange,
	id,
	checked = false,
}: CheckboxProps) => {
	return (
		<Container>
			<input
				id={id}
				type='checkbox'
				onChange={onChange}
				disabled={disabled}
				checked={checked}
			/>
			<label>{label}</label>
		</Container>
	);
};

export default Checkbox;
