import BookingTable from '@/features/bookings/BookingTable';
import BookingTableOperations from '@/features/bookings/BookingTableOperations';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';

const Bookings = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All bookings</Heading>
				<BookingTableOperations />
			</Row>
			<Row type='vertical'>
				<BookingTable />
			</Row>
		</>
	);
};

export default Bookings;
