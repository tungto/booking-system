import { getTodayBookings } from '@/services/apiBookings';
import { useQuery } from '@tanstack/react-query';

const useTodayActivity = () => {
	const {
		data: activities,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['bookings', 'today-activity'],
		queryFn: getTodayBookings,
	});

	return { activities, isLoading, error };
};

export default useTodayActivity;
