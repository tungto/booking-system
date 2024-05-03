import { getCurrentUser } from '@/services/apiAuth';
import { useQuery } from '@tanstack/react-query';
const useUser = () => {
	const { isLoading, data, error, fetchStatus } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	console.log(data, isLoading, error);

	return {
		isLoading,
		user: data,
		isAuthenticated: data?.role === 'authenticated',
		fetchStatus,
	};
};

export default useUser;
