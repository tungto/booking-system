import { signup } from '@/services/apiAuth';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useSignup = () => {
	const {
		mutate: signUp,
		isPending,
		error,
	} = useMutation({
		mutationFn: signup,
		onError: () => {
			toast.error('Sign up failed');
		},
		onSuccess: () => {
			toast.success(
				'Account successfully created. Please verify your account email address'
			);
		},
	});

	return { signUp, isPending, error };
};

export default useSignup;
