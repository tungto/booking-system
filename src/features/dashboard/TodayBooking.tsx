import { Activity, BookingStatus } from '@/types';
import Button from '@/ui/Button';
import { Flag } from '@/ui/Flag';
import Tag from '@/ui/Tag';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import CheckoutButton from '../check-in-out/CheckoutButton';

const StyledRow = styled.li`
	display: grid;
	grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
	gap: 1.2rem;
	align-items: center;

	font-size: 1.4rem;
	padding: 0.8rem 0;
	border-bottom: 1px solid var(--color-grey-100);

	&:first-child {
		border-top: 1px solid var(--color-grey-100);
	}
`;

const Guest = styled.div`
	font-weight: 500;
`;

type TodayBooking = {
	booking: Activity;
};

const TodayBooking = ({ booking }: TodayBooking) => {
	const {
		id,
		status,
		guests: { countryFlag, fullName },
		numNights,
	} = booking;

	const navigate = useNavigate();

	return (
		<StyledRow>
			{status === 'unconfirmed' && <Tag type='green'>Arriving</Tag>}
			{status === 'checked-in' && <Tag type='blue'>Departing</Tag>}
			<Flag src={countryFlag} />
			<Guest>{fullName}</Guest>
			<span>{numNights} nights</span>
			{status === BookingStatus.unconfirmed && (
				<Button
					variation='primary'
					size='small'
					onClick={() => navigate(`/checkin/${id}`)}>
					Check in
				</Button>
			)}
			{status === BookingStatus.checkedIn && (
				<CheckoutButton size='small' id={id}>
					Check out
				</CheckoutButton>
			)}
		</StyledRow>
	);
};

export default TodayBooking;
