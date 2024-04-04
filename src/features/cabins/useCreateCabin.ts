import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin as createCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateCabin = () => {
	const queryClient = useQueryClient();

	const {
		data,
		isPending: isCreating,
		error,
		mutate: createCabin,
	} = useMutation({
		mutationFn: createCabinApi,
		onSuccess: () => {
			toast.success('create toast success!');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: () => {
			toast.error('create toast error!');
		},
	});
	return {
		data,
		isCreating,
		error,
		createCabin,
	};
};

export default useCreateCabin;
