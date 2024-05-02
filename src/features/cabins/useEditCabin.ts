import { TCabinUpdate } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { editCabin as editCabinApi } from '../../services/apiCabins';

const useEditCabin = () => {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isPending: isEditing } = useMutation({
		mutationFn: ({ newCabinData }: { newCabinData: TCabinUpdate }) =>
			editCabinApi(newCabinData),
		onSuccess: () => {
			toast.success('Edit cabin success');
			queryClient.invalidateQueries({ queryKey: ['cabins'] });
		},
		onError: () => {
			toast.error('Edit cabin failed');
		},
	});
	return {
		isEditing,
		editCabin,
	};
};

export default useEditCabin;
