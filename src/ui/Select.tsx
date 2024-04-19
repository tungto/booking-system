import styled from 'styled-components';

type OptionProps = {
	label: string;
	value: string;
};

type SelectProps = {
	options: OptionProps[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	value: string;
	name: string;
	id: string;
	type: string;
};

type StyledSelectProps = {
	type: string;
};

const StyledSelect = styled.select<StyledSelectProps>`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);

	${(props: StyledSelectProps) =>
		props.type === 'white'
			? 'var(--color-grey-100)'
			: 'var(--color-grey-300)'}
`;

const defaultProps: StyledSelectProps = {
	type: 'white',
};

const Select = ({ options, value, onChange, type }: SelectProps) => {
	return (
		<StyledSelect
			type={type}
			name='sortBy'
			id='sortBy'
			onChange={onChange}
			value={value}>
			{options.map((opt) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</StyledSelect>
	);
};

Select.defaultProps = defaultProps;

export default Select;
