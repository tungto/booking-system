import Button from '@/ui/Button';
import FormRowVertical from '@/ui/FormRowVertical';
import Input from '@/ui/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import useLogin from './useLogin';
import Spinner from '@/ui/Spinner';

const StyledForm = styled.form`
	padding: 2.4rem 4rem;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	overflow: hidden;
	font-size: 1.4rem;
`;

type LoginForm = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginForm>({
		defaultValues: { email: 'example@gmail.com', password: '123456' },
	});

	const { performLogin, isPending } = useLogin();

	const onSubmit: SubmitHandler<LoginForm> = (data) => {
		performLogin(
			{ email: data.email, password: data.password },
			{ onSettled: () => reset() }
		);
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} name='login'>
			<FormRowVertical
				label='Email Address'
				error={errors?.email?.message as string}>
				<Input
					type='email'
					placeholder='Email Address'
					id='email'
					{...register('email', {
						required: 'This field is required.',
					})}
				/>
			</FormRowVertical>
			<FormRowVertical
				label='Password'
				error={errors?.password?.message as string}>
				<Input
					type='password'
					id='password'
					autoComplete='on'
					{...register('password', {
						required: 'This field is required.',
						minLength: {
							value: 2,
							message:
								'Password should be at least 2 characters long.',
						},
					})}
				/>
			</FormRowVertical>
			<Button
				size='large'
				variation='primary'
				type='submit'
				disabled={isPending}>
				{isPending ? <Spinner /> : 'Login'}
			</Button>
		</StyledForm>
	);
};

export default LoginForm;
