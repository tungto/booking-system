import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

export const CabinTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField='discount'
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'no-discount', label: 'No discount' },
					{ value: 'with-discount', label: 'With discount' },
				]}
			/>
			<SortBy
				options={[
					{ label: 'Sort Cabins', value: '' },
					{ label: 'Name (A-Z)', value: 'name-asc' },
					{ label: 'Name (Z-A)', value: 'name-dsc' },
					{ label: 'Price - low first', value: 'regularPrice-asc' },
					{ label: 'Price - high first', value: 'regularPrice-dsc' },
					{
						label: 'Max Capacity - low first',
						value: 'maxCapacity-asc',
					},
					{
						label: 'Max Capacity - high first',
						value: 'maxCapacity-dsc',
					},
				]}
			/>
		</TableOperations>
	);
};
