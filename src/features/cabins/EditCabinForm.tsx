import { SubmitHandler, useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useEditCabin from './useEditCabin';
import { Cabin } from '../../types';

export type MutateCabinInputs = {
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string;
};

type EditCabinFormProps = {
	cabin?: Cabin;
};

const EditCabinForm = ({ cabin }: EditCabinFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<MutateCabinInputs>();

	const { editCabin, isEditing } = useEditCabin();

	const onSubmit: SubmitHandler<MutateCabinInputs> = (data) => {
		editCabin({ newCabinData: data, id: cabin?.id || '' });
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
				<Input type='file' {...register('image')} />
			</FormRow>
			<input type='submit' disabled={isEditing} />
		</form>
	);
};

export default EditCabinForm;
