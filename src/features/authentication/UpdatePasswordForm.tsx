import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { useForm } from 'react-hook-form';
import useUpdateUser from './useUpdateUser';
import Form from '@/ui/Form';

type UpdatePasswordFormProps = {
	password: string;
	repeatPassword: string;
};

const UpdatePasswordForm = () => {
	const {
		handleSubmit,
		register,
		watch,
		reset,
		formState: { errors },
	} = useForm<UpdatePasswordFormProps>();

	const { isUpdating, updateUser } = useUpdateUser();

	function onSubmit(data: UpdatePasswordFormProps) {
		updateUser({ password: data.password });
	}

	function handleCancel() {
		reset();
	}

	return (
		<Form type='regular' onSubmit={handleSubmit(onSubmit)}>
			<FormRow error={errors.password?.message} label='Update Password'>
				<Input
					type='password'
					id='password'
					disabled={isUpdating}
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
					})}
				/>
			</FormRow>
			<FormRow
				error={errors.repeatPassword?.message}
				label='Repeat Password'>
				<Input
					type='repeatPassword'
					id='repeatPassword'
					disabled={isUpdating}
					{...register('repeatPassword', {
						required: 'This field is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters',
						},
						validate: (val) => {
							if (watch('password') !== val) {
								return 'Your passwords do no match';
							}
						},
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					variation='secondary'
					type='reset'
					onClick={handleCancel}>
					Cancel
				</Button>
				<Button variation='primary' type='submit'>
					Update Password
				</Button>
			</FormRow>
		</Form>
	);
};

export default UpdatePasswordForm;
