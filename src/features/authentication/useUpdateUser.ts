import { updateCurrentUser } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateUser = () => {
	const queryClient = useQueryClient();
	const {
		mutate: updateUser,
		isPending: isUpdating,
		error,
	} = useMutation({
		mutationFn: updateCurrentUser,
		onError: () => {
			toast.error('Fail to update user');
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data.user);
			toast.success('User updated successfully');
		},
	});

	return { isUpdating, updateUser, error };
};

export default useUpdateUser;
