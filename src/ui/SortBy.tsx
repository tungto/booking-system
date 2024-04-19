import { useSearchParams } from 'react-router-dom';
import Select from './Select';

type SortOption = {
	label: string;
	value: string;
};
type SortProps = {
	sortOptions: SortOption[];
};

const SortBy = ({ sortOptions }: SortProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sortBy') || '';

	function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
		searchParams.set('sortBy', e.currentTarget.value);
		setSearchParams(searchParams);
	}

	return (
		<Select
			type='white'
			name='sortBy'
			id='sortBy'
			onChange={handleSort}
			value={sortBy}
			options={sortOptions}
		/>
	);
};

export default SortBy;
