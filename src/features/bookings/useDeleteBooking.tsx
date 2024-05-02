import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const {
		error,
		isPending: isDeleting,
		mutate: deleteBooking,
	} = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			toast.success('Booking deleted');
			queryClient.invalidateQueries({ queryKey: ['bookings'] });
		},
	});
	return { error, isDeleting, deleteBooking };
};

export default useDeleteBooking;
