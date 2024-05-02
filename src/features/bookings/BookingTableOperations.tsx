import Filter from '@/ui/Filter';
import TableOperations from '@/ui/TableOperations';
import SortBy from '@/ui/SortBy';
import { BookingStatus } from '@/types';

const BookingTableOperations = () => {
	return (
		<TableOperations>
			<Filter
				filterField='status'
				options={[
					{
						label: 'All',
						value: 'all',
					},
					{
						label: 'Checked out',
						value: BookingStatus.checkedOut,
					},
					{
						label: 'Checked in',
						value: BookingStatus.checkedIn,
					},
					{
						label: 'Unconfirmed',
						value: BookingStatus.unconfirmed,
					},
				]}
			/>
			<SortBy
				options={[
					{
						label: 'Sort by date (recent first)',
						value: 'startDate-dsc',
					},
					{
						label: 'Sort by date (earlier first)',
						value: 'startDate-asc',
					},
					{
						label: 'Sort by amount (high first)',
						value: 'totalPrice-dsc',
					},
					{
						label: 'Sort by amount (low first)',
						value: 'totalPrice-asc',
					},
				]}
			/>
		</TableOperations>
	);
};

export default BookingTableOperations;
