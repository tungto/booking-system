import styled from 'styled-components';
import useCabins from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useSearchParams } from 'react-router-dom';
import { CabinField, CabinFilterOptions } from './type';

const Table = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

const TableHeader = styled.header`
	display: grid;
	grid-template-columns: 0.6rem 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

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
		<Table>
			<TableHeader>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</TableHeader>
			{sortedCabins?.map((item, index) => (
				<CabinRow key={index} cabin={item} />
			))}
		</Table>
	);
};

export default CabinTable;
