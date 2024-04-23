import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useDeleteCabin = () => {
	const queryClient = useQueryClient();
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success('Cabin successfully deleted');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: () => {
			toast.success('Cabin deleting failed');
		},
	});

	return { isDeleting, deleteCabin };
};

export default useDeleteCabin;
