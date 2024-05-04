import { SignUp } from '@/types';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import Spinner from '@/ui/Spinner';
import { useForm } from 'react-hook-form';
import useSignup from './useSignup';
import Form from '@/ui/Form';

const SignUpForm = () => {
	const {
		reset,
		handleSubmit,
		formState: { errors },
		register,
		watch,
	} = useForm<SignUp>({});

	const { isPending, signUp } = useSignup();

	function onSubmit(data: SignUp) {
		signUp(data, {
			onSettled: () => reset(),
		});
	}

	function handleCancel() {
		reset();
	}

	return (
		<Form type='regular' onSubmit={handleSubmit(onSubmit)}>
			<FormRow error={errors.fullName?.message} label='Full name'>
				<Input
					disabled={isPending}
					id='fullName'
					type='text'
					{...register('fullName', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow error={errors.email?.message} label='Email'>
				<Input
					disabled={isPending}
					id='email'
					type='email'
					{...register('email', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow error={errors.password?.message} label='Password'>
				<Input
					disabled={isPending}
					id='password'
					type='password'
					autoComplete='on'
					{...register('password', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow
				error={errors.repeatPassword?.message as string}
				label='Repeat password'>
				<Input
					disabled={isPending}
					id='repeatPassword'
					type='password'
					{...register('repeatPassword', {
						required: 'This field is required',
						validate: (val: string) => {
							if (watch('password') !== val) {
								return 'Your passwords do no match';
							}
						},
						minLength: {
							value: 6,
							message:
								'Password must be at least 6 characters long',
						},
					})}
				/>
			</FormRow>
			<FormRow>
				<Button type='submit' variation='primary' disabled={isPending}>
					{isPending ? <Spinner /> : 'Create User'}
				</Button>
				<Button
					type='reset'
					disabled={isPending}
					variation='secondary'
					onClick={handleCancel}>
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default SignUpForm;
