import useMoveBack from '@/hooks/useMoveBack';
import Button from '@/ui/Button';
import ButtonText from '@/ui/ButtonText';
import Checkbox from '@/ui/Checkbox';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';
import Spinner from '@/ui/Spinner';
import { useState } from 'react';
import styled from 'styled-components';
import useBooking from '../bookings/useBooking';
import BookingDataBox from '../bookings/BookingDataBox';
import useCheckIn from './useCheckIn';
import { BookingData, BookingStatus, TBookingUpdate } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import useSettings from '../setttings/useSettings';

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 1.6rem;
`;

const CheckInBooking = () => {
	const moveBack = useMoveBack();
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { booking = {}, isLoading, error } = useBooking();
	const { checkIn, error: updateError, isCheckingIn } = useCheckIn();

	const {
		id: bookingId,
		hasBreakfast,
		totalPrice,
		numNights,
		guests,
	} = booking as BookingData;

	const { settings } = useSettings();

	const optionalBreakfastPrice =
		(settings?.breakfastPrice as number) * numNights!;

	// update booking status, totalPrice and revalidate booking cache
	function handleCheckIn() {
		if (!confirmPaid) return;

		let updateData: TBookingUpdate & {
			cabinId?: number | null;
		} = {
			id: bookingId,
			status: BookingStatus.checkedIn,
			isPaid: true,
		};

		if (addBreakfast) {
			updateData = {
				...updateData,
				hasBreakfast: true,
				extrasPrice: optionalBreakfastPrice,
				totalPrice: optionalBreakfastPrice + totalPrice,
			};
		}

		checkIn(updateData);
	}

	const finalTotalPrice = addBreakfast
		? totalPrice + optionalBreakfastPrice * numNights
		: totalPrice;

	if (isLoading || isCheckingIn) return <Spinner />;

	if (error || updateError) return <span>error</span>;

	return (
		<>
			<Row type='horizontal'>
				<Heading>Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<BookingDataBox booking={booking as BookingData} />
			{!hasBreakfast && (
				<Box>
					<Checkbox
						id='breakfast'
						label={`Want to add breakfast for ${
							optionalBreakfastPrice * numNights!
						}?`}
						disabled={confirmPaid}
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast(!addBreakfast);
							setConfirmPaid(false);
						}}
					/>
				</Box>
			)}

			<Box>
				<Checkbox
					id='confirm'
					label={`I confirm that ${
						guests.fullName
					} has paid the total amount of ${formatCurrency(
						finalTotalPrice
					)}`}
					disabled={isCheckingIn}
					onChange={() => setConfirmPaid((confirm) => !confirm)}
					checked={confirmPaid}
				/>
			</Box>

			<Buttons>
				<Button
					variation='primary'
					onClick={handleCheckIn}
					disabled={!confirmPaid}>
					Check in booking #873
				</Button>
				<Button variation='secondary'>Cancel</Button>
			</Buttons>
		</>
	);
};

export default CheckInBooking;
