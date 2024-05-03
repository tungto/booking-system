import BookingDataBox from '@/features/bookings/BookingDataBox';
import { statusToTagName } from '@/features/bookings/constants';
import useBooking from '@/features/bookings/useBooking';
import useDeleteBooking from '@/features/bookings/useDeleteBooking';
import useMoveBack from '@/hooks/useMoveBack';
import { BookingData, BookingStatus } from '@/types';
import Button from '@/ui/Button';
import ButtonText from '@/ui/ButtonText';
import ConfirmDelete from '@/ui/ConfirmDelete';
import Heading from '@/ui/Heading';
import Modal from '@/ui/Modal';
import Row from '@/ui/Row';
import Spinner from '@/ui/Spinner';
import Tag from '@/ui/Tag';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useCheckout from '../check-in-out/useCheckout';

const Buttons = styled.div`
	display: flex;
	gap: 1.2rem;
	-webkit-box-pack: end;
	justify-content: flex-end;
`;

const HeadingRow = styled(Row)`
	gap: 2.4rem;
`;

const BookingDetails = () => {
	const { booking, isLoading, error } = useBooking();
	const { isCheckingOut, checkout } = useCheckout();
	const { status } = booking || {};

	const moveBack = useMoveBack();
	const navigate = useNavigate();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	if (isLoading) return <Spinner />;

	if (error) return <span>error</span>;
	return (
		<>
			<Row type='horizontal'>
				<HeadingRow type='horizontal'>
					<Heading>Booking #{(booking as BookingData).id}</Heading>
					<Tag type={statusToTagName[status as BookingStatus]}>
						{status}
					</Tag>
				</HeadingRow>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>
			<BookingDataBox booking={booking as BookingData} />
			<Buttons>
				{status === BookingStatus.unconfirmed && (
					<Button
						variation='primary'
						onClick={() => navigate(`/checkin/${booking?.id}`)}>
						Check in booking #873
					</Button>
				)}

				{status === BookingStatus.checkedIn && (
					<Button
						variation='primary'
						onClick={() => checkout(booking?.id as number)}
						disabled={isCheckingOut}>
						Check out booking #873
					</Button>
				)}

				<Modal>
					<Modal.Open opens='delete-booking'>
						<Button variation='danger'>Delete Booking</Button>
					</Modal.Open>
					<Modal.Window name='delete-booking'>
						<ConfirmDelete
							disabled={isDeleting}
							resourceName='booking'
							onConfirm={() => {
								deleteBooking(booking!.id, {
									onSettled: () => moveBack(),
								});
							}}
						/>
					</Modal.Window>
				</Modal>

				<Button onClick={moveBack} variation='secondary'>
					Back
				</Button>
			</Buttons>
		</>
	);
};

export default BookingDetails;
