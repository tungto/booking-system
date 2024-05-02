import { BookingData, BookingStatus } from '@/types';
import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import Tag from '@/ui/Tag';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';
import { format, isToday } from 'date-fns';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { statusToTagName } from './constants';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';
import useDeleteBooking from './useDeleteBooking';

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

interface BookingRowProps {
	booking: BookingData;
}

const BookingRow = ({ booking }: BookingRowProps) => {
	const navigate = useNavigate();
	const { deleteBooking, isDeleting } = useDeleteBooking();
	const {
		cabins: { name: cabinName },
		guests: { fullName, email },
		startDate,
		endDate,
		numNights,
		totalPrice,
		status,
		id,
	} = booking;

	function handleCheckIn() {
		navigate(`/checkin/${id}`);
	}

	function handleCheckOut() {
		navigate(`/checkout/${id}`);
	}

	return (
		<Table.Row>
			<Modal>
				<div>{cabinName}</div>
				<Stacked>
					<span>{fullName}</span>
					<span>{email}</span>
				</Stacked>
				<Stacked>
					<span>
						{isToday(new Date(startDate))
							? 'Today'
							: formatDistanceFromNow(startDate)}{' '}
						&rarr;
						{numNights} night stay
					</span>
					<span>
						{format(new Date(startDate), 'MMM dd yyyy')}
						&mdash; {format(new Date(endDate), 'MMM dd yyyy')}
					</span>
				</Stacked>
				<Tag type={statusToTagName[status as BookingStatus]}>
					{status}
				</Tag>
				<Amount>{formatCurrency(totalPrice)}</Amount>

				<Menus>
					<Menus.Toggle id={booking.id!} />

					<Menus.Menu>
						<Menus.List id={booking.id!}>
							<Menus.Button
								onClick={() => navigate(`/bookings/${id}`)}>
								See Details
							</Menus.Button>
							{status === BookingStatus.unconfirmed && (
								<Menus.Button onClick={handleCheckIn}>
									Check in
								</Menus.Button>
							)}

							{status === BookingStatus.checkedIn && (
								<Menus.Button onClick={handleCheckOut}>
									Check out
								</Menus.Button>
							)}

							<Modal.Open opens='delete'>
								<Menus.Button>Delete Booking</Menus.Button>
							</Modal.Open>
						</Menus.List>
					</Menus.Menu>
				</Menus>

				<Modal.Window name='delete'>
					<ConfirmDelete
						disabled={isDeleting}
						resourceName='booking'
						onConfirm={() => deleteBooking(booking!.id)}
					/>
				</Modal.Window>
			</Modal>
		</Table.Row>
	);
};

export default BookingRow;
