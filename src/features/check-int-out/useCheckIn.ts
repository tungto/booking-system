import { updateBooking } from '@/services/apiBookings';
import { TBookingUpdate } from '@/types';
import { QueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useCheckIn = () => {
	const queryClient = new QueryClient();
	const navigate = useNavigate();
	const {
		error,
		isPending: isCheckingIn,
		mutate: checkIn,
	} = useMutation({
		mutationFn: (data: TBookingUpdate) =>
			updateBooking(data.id as number, data),
		onError: () => {
			toast.error('There sth wrong when check in. Please try again');
		},
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			// after check in success we will invalidate all active queries and refetch
			queryClient.invalidateQueries({ refetchType: 'active' });
			navigate('/');
		},
	});

	return { checkIn, error, isCheckingIn };
};

export default useCheckIn;
