import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	const { isUpdating, updateSettings } = useUpdateSettings();

	if (isLoading) return <Spinner />;

	function handleUpdate(
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) {
		const { value } = e.target;

		if (!value) return;
		updateSettings({ id: 1, settingsData: { [field]: value } });
	}

	return (
		<Form type='regular'>
			<FormRow label='Minimum nights/booking'>
				<Input
					type='number'
					id='min-nights'
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'minBookingLength')}
				/>
			</FormRow>

			<FormRow label='Maximum nights/booking'>
				<Input
					type='number'
					id='max-nights'
					defaultValue={maxBookingLength as number}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
				/>
			</FormRow>

			<FormRow label='Maximum guests/booking'>
				<Input
					type='number'
					id='max-guests'
					defaultValue={maxGuestsPerBooking as number}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
				/>
			</FormRow>

			<FormRow label='Breakfast price'>
				<Input
					type='number'
					id='breakfast-price'
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
