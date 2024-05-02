import { getBooking } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

const useBooking = () => {
	const { bookingId } = useParams();

	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ['booking', bookingId],
		queryFn: () => getBooking(bookingId || ''),
	});

	console.log(booking);

	return { isLoading, booking, error };
};

export default useBooking;
