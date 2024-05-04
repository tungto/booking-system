import { SubmitHandler, useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useEditCabin from './useEditCabin';
import Button from '../../ui/Button';
import useCreateCabin from './useCreateCabin';
import FileInput from '../../ui/FileInput';
import Textarea from '@/ui/Textarea';
import { TCabinInsert, TCabinUpdate } from '@/types';
import Form from '@/ui/Form';

type EditCabinFormProps = {
	cabin?: TCabinInsert;
	onCloseModal?: () => void;
};

const CreateEditCabinForm = ({ cabin, onCloseModal }: EditCabinFormProps) => {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<TCabinInsert>({
		defaultValues: cabin ? cabin : undefined,
	});

	const { editCabin, isEditing } = useEditCabin();
	const { createCabin, isCreating } = useCreateCabin();
	const isWorking = isEditing || isCreating;

	const onSubmit: SubmitHandler<TCabinInsert | TCabinUpdate> = (data) => {
		if (cabin?.id) {
			editCabin({ newCabinData: data as TCabinUpdate });
		} else {
			createCabin(data as TCabinInsert);
		}

		onCloseModal?.();
	};

	return (
		<Form type='regular' onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Cabin name' error={errors?.name?.message as string}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
						maxLength: 30,
					})}
				/>
			</FormRow>
			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message as string}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow
				label='Regular Price'
				error={errors?.regularPrice?.message as string}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow
				label='Discount'
				error={errors?.discount?.message as string}>
				<Input
					type='number'
					id='discount'
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: (value) =>
							(value as number) <= getValues().regularPrice ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>
			<FormRow
				label='Description for Website'
				error={errors?.description?.message as string}>
				<Textarea
					id='description'
					disabled={isWorking}
					{...register('description', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow
				label='Cabin Photo'
				error={errors?.image?.message as string}>
				<FileInput
					type='file'
					id='image'
					accept='image/*'
					{...register('image')}
				/>
			</FormRow>
			<FormRow>
				<Button
					variation='primary'
					type='submit'
					disabled={isCreating || isEditing}>
					{cabin?.id ? 'Update Cabin' : 'Create Cabin'}
				</Button>
				<Button
					type='button'
					variation='secondary'
					onClick={onCloseModal}>
					Cancel
				</Button>
			</FormRow>
		</Form>
	);
};

export default CreateEditCabinForm;
