import useCabins from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useSearchParams } from 'react-router-dom';
import { Cabin, CabinField, CabinFilterOptions } from './type';
import Table from '../../ui/Table';

const CabinTable = () => {
	const { isLoading, cabins, error } = useCabins();
	const [searchParams] = useSearchParams();

	//1. FILTER
	const filteredBy = searchParams.get('discount') || 'all';
	let filteredCabins = cabins!;

	if (filteredBy === CabinFilterOptions.withDiscount) {
		filteredCabins = filteredCabins.filter((cabin) => cabin.discount > 0);
	}

	if (filteredBy === CabinFilterOptions.noDiscount) {
		filteredCabins = filteredCabins.filter((cabin) => cabin.discount === 0);
	}

	//2. SORT
	const sortBy = searchParams.get('sortBy') || '';
	const [field, direction] = sortBy.split('-') as [CabinField, string];
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedCabins = filteredCabins?.sort(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(a: any, b: any) => {
			if (typeof a[field] === 'string') {
				return a[field].localeCompare(b[field]) * modifier;
			}
			return (a[field] - b[field]) * modifier;
		}
	);

	if (isLoading) return <Spinner />;

	if (error) return <span>error</span>;

	return (
		<Table columns='0.6rem 1.8fr 2.2fr 1fr 1fr 1fr'>
			<Table.Header>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			<Table.Body
				data={sortedCabins}
				render={(cabin: Cabin) => (
					<CabinRow key={cabin.id} cabin={cabin} />
				)}
			/>
		</Table>
	);
};

export default CabinTable;
