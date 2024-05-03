import { logout } from '@/services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useLogout = () => {
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const { isPending, mutate: logoutPerform } = useMutation({
		mutationFn: logout,
		onError: () => {
			toast.error('Logout failed');
		},
		onSuccess: () => {
			toast.success('Logout succeeded');
			// we should remove all queries when logout to prevent any js injection
			queryClient.removeQueries();

			// using replace to remove stack history
			navigate('/login', { replace: true });
		},
	});

	return { isPending, logoutPerform };
};

export default useLogout;
