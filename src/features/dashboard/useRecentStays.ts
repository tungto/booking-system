import { getStayAfterDate } from '@/services/apiBookings';
import { BookingStatus } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

const useRecentStays = () => {
	const [searchParams] = useSearchParams();
	const numDays = searchParams.get('last')
		? Number(searchParams.get('last'))
		: 7;
	const queryDate = subDays(new Date(), numDays).toISOString();

	const {
		isLoading,
		data: stays,
		error,
	} = useQuery({
		queryFn: () => getStayAfterDate(queryDate),
		queryKey: ['stays', `last-${numDays}`],
	});

	const confirmedStays = stays?.filter(
		(cur) =>
			cur.status === BookingStatus.checkedIn ||
			cur.status === BookingStatus.checkedOut,
		0
	);

	return { isLoading, numDays, error, confirmedStays };
};

export default useRecentStays;
