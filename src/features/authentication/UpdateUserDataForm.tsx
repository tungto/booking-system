import { UpdateUserData } from '@/types';
import Button from '@/ui/Button';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { User } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import useUpdateUser from './useUpdateUser';
import useUser from './useUser';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';

const UpdateUserDataForm = () => {
	const { user } = useUser();
	const {
		email,
		user_metadata: { fullName },
	} = user as User;

	const {
		handleSubmit,
		formState: { errors, dirtyFields },
		register,
		reset,
	} = useForm<UpdateUserData>({
		defaultValues: { email, fullName },
	});

	const { updateUser, isUpdating } = useUpdateUser();

	function onSubmit(data: UpdateUserData) {
		const dirtyData: Partial<UpdateUserData> = {};

		for (const [key, value] of Object.entries(dirtyFields)) {
			if (value)
				dirtyData[key as keyof UpdateUserData] =
					data[key as keyof UpdateUserData];
		}

		updateUser(dirtyData);
	}

	function handleCancel() {
		reset({ email, fullName });
	}
	return (
		<Form type='regular' onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Email address'>
				<Input
					type='email'
					id='email'
					disabled={true}
					{...register('email')}
				/>
			</FormRow>
			<FormRow label='Full name' error={errors.fullName?.message}>
				<Input
					type='text'
					id='fullName'
					disabled={isUpdating}
					{...register('fullName', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Avatar'>
				<FileInput
					id='avatar'
					{...register('avatar')}
					disabled={isUpdating}
					accept='image/*'
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
					Update Account
				</Button>
			</FormRow>
		</Form>
	);
};

export default UpdateUserDataForm;
