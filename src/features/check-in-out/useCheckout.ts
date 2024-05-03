import { updateBooking } from '@/services/apiBookings';
import { BookingStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useCheckout = () => {
	const queryClient = useQueryClient();
	const {
		isPending: isCheckingOut,
		error,
		mutate: checkout,
	} = useMutation({
		mutationFn: (id: number) =>
			updateBooking(id, { status: BookingStatus.checkedOut }),
		onSuccess: (data) => {
			toast.success(`Booking ${data.id} successfully checked out`);
			queryClient.invalidateQueries({ refetchType: 'active' });
		},
		onError: () => {
			toast.error('There was an error while checking out');
		},
	});

	return { isCheckingOut, error, checkout };
};

export default useCheckout;
