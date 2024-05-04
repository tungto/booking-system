import { getCurrentUser } from '@/services/apiAuth';
import { useQuery } from '@tanstack/react-query';
const useUser = () => {
	const { isLoading, data, fetchStatus } = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser,
	});

	return {
		isLoading,
		user: data,
		isAuthenticated: data?.role === 'authenticated',
		fetchStatus,
	};
};

export default useUser;
