import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin as createCabinApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateCabin = () => {
	const queryClient = useQueryClient();

	const {
		data,
		isPending: isCreating,
		mutate: createCabin,
	} = useMutation({
		mutationFn: createCabinApi,
		onSuccess: () => {
			toast.success('create toast success!');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: () => {
			toast.error('Create Cabin Failed!');
		},
	});
	return {
		data,
		isCreating,
		createCabin,
	};
};

export default useCreateCabin;
