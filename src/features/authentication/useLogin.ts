import { login } from '@/services/apiAuth';
import { Login } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useLogin = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		mutate: performLogin,
		isPending,
		error,
		data: loginData,
	} = useMutation({
		mutationFn: ({ email, password }: Login) => login({ email, password }),
		onError: () => {
			toast.error('Login failed, email or password incorrect');
		},
		onSuccess: (user) => {
			toast.success('Login successful');
			// save user data to the cache so when access user data from useUser
			// we just need to get it from the cache
			queryClient.setQueryData(['user'], user);
			// using replace to remove stack history

			navigate('/dashboard', { replace: true });
		},
	});

	return { isPending, error, performLogin, loginData };
};

export default useLogin;
