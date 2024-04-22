import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

type FilterButtonProps = {
	active: string;
};

const StyledFilterComponent = styled.div`
	display: flex;
	justify-content: space-between;
	border: 1px solid var(--color-grey-100);
`;

const FilterButton = styled.button<FilterButtonProps>`
	padding: 0.44rem 0.8rem;
	font-size: 1.4rem;
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	transition: all 0.3s;
	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}

	${(props) =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}
`;

type Option = {
	value: string;
	label: string;
};
type FilterProps = {
	options: Option[];
	filterField: string;
};
const Filter = ({ options, filterField }: FilterProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentFilter = searchParams.get(filterField) || options[0].value;

	function handleSelectFilter(value: string) {
		searchParams.set(filterField, value);

		if (searchParams.get('page')) searchParams.set('page', '1');

		setSearchParams(searchParams);
	}
	return (
		<StyledFilterComponent>
			{options.map((opt) => (
				<FilterButton
					key={opt.value}
					onClick={() => handleSelectFilter(opt.value)}
					disabled={opt.value === currentFilter}
					active={opt.value === currentFilter ? 'active' : ''}>
					{opt.label}
				</FilterButton>
			))}
		</StyledFilterComponent>
	);
};

export default Filter;
