import { SubmitHandler, useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useEditCabin from './useEditCabin';
import { Cabin } from '../../types';
import Button from '../../ui/Button';
import useCreateCabin from './useCreateCabin';
import FileInput from '../../ui/FileInput';

export type MutateCabinInputs = {
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string | [File];
};

type EditCabinFormProps = {
	cabin?: Cabin;
	onCloseModal?: () => void;
};

const EditCabinForm = ({ cabin, onCloseModal }: EditCabinFormProps) => {
	console.log(cabin);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MutateCabinInputs>({
		defaultValues: cabin ? cabin : {},
	});

	const { editCabin, isEditing } = useEditCabin();
	const { createCabin, isCreating } = useCreateCabin();

	const onSubmit: SubmitHandler<MutateCabinInputs> = (data) => {
		if (cabin?.id) {
			editCabin({ newCabinData: data, id: cabin.id });
		} else {
			createCabin(data);
		}

		onCloseModal?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label='Cabin name' error={errors?.name?.message as string}>
				<Input
					type='text'
					{...register('name', { required: true, maxLength: 30 })}
				/>
			</FormRow>
			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message as string}>
				<Input
					type='number'
					{...register('maxCapacity', { required: true })}
				/>
			</FormRow>
			<FormRow
				label='Regular Price'
				error={errors?.regularPrice?.message as string}>
				<Input
					type='number'
					{...register('regularPrice', { required: true })}
				/>
			</FormRow>
			<FormRow
				label='Discount'
				error={errors?.discount?.message as string}>
				<Input
					type='number'
					{...register('discount', { required: true, min: 0 })}
				/>
			</FormRow>
			<FormRow
				label='Description for Website'
				error={errors?.description?.message as string}>
				<Input
					type='text'
					{...register('description', { required: true })}
				/>
			</FormRow>
			<FormRow
				label='Cabin Photo'
				error={errors?.image?.message as string}>
				<FileInput
					type='file'
					accept='image/*'
					{...register('image')}
				/>
			</FormRow>
			<Button
				variation='primary'
				type='submit'
				disabled={isCreating || isEditing}>
				{cabin?.id ? 'Update Cabin' : 'Create Cabin'}
			</Button>
		</form>
	);
};

export default EditCabinForm;
