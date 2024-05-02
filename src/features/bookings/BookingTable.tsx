import Spinner from '@/ui/Spinner';
import Table from '@/ui/Table';
import BookingRow from './BookingRow';
import useBookings from './useBookings';
import Pagination from '@/ui/Pagination';

const BookingTable = () => {
	const { bookings, error, isLoading, count } = useBookings();

	if (isLoading) return <Spinner />;

	if (error) return <span>error</span>;
	return (
		<>
			<Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>
				<Table.Body
					data={bookings || []}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking} />
					)}
				/>
				<Table.Footer>
					<Pagination count={count || 0} />
				</Table.Footer>
			</Table>
		</>
	);
};

export default BookingTable;
