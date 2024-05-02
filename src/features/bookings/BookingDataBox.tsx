import { BookingData } from '@/types';
import DataItem from '@/ui/DataItem';
import { Flag } from '@/ui/Flag';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';
import { format } from 'date-fns';
import {
	HiOutlineChatBubbleBottomCenterText,
	HiOutlineCheckCircle,
	HiOutlineCurrencyDollar,
} from 'react-icons/hi2';
import styled from 'styled-components';

const StyledDataSection = styled.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	overflow: hidden;
`;

const StyledHeader = styled.header`
	background-color: var(--color-brand-500);
	padding: 2rem 4rem;
	color: rgb(224, 231, 255);
	font-size: 1.8rem;
	font-weight: 500;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	justify-content: space-between;
`;

const StyledBody = styled.section`
	padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	gap: 1.2rem;
	margin-bottom: 1.6rem;
	color: var(--color-grey-500);
`;

type PriceProps = { isPaid: boolean };
const Price = styled.div<PriceProps>`
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: justify;
	justify-content: space-between;
	padding: 1.6rem 3.2rem;
	border-radius: var(--border-radius-sm);
	margin-top: 2.4rem;
	background-color: ${(props) =>
		props.isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
	color: ${(props) =>
		props.isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};
`;

const Footer = styled.footer`
	padding: 1.6rem 4rem;
	font-size: 1.2rem;
	color: var(--color-grey-500);
	text-align: right;
`;

const P = styled.p`
	font-weight: 600;
`;

type BookingDataBoxProps = {
	booking: BookingData;
};

const BookingDataBox = ({ booking }: BookingDataBoxProps) => {
	const {
		guests: { fullName, email, nationalID, countryFlag, nationality },
		totalPrice,
		numGuests,
		hasBreakfast,
		observations,
		numNights,
		startDate,
		endDate,
		isPaid,
		created_at,
		cabins: { name: cabinName },
	} = booking;

	function formatDate(date: string) {
		return format(new Date(date), 'EEE, MMM dd yyyy ');
	}

	return (
		<StyledDataSection>
			<StyledHeader>
				<P>
					{numNights} nights in {cabinName}
				</P>

				<p>
					<span>
						{formatDate(startDate)} (
						{formatDistanceFromNow(startDate)})
					</span>{' '}
					-<span>{formatDate(endDate)}</span>
				</p>
			</StyledHeader>
			<StyledBody>
				<Guest>
					<Flag src={countryFlag} alt={nationality} />
					<span>
						{fullName}
						{numGuests > 1 && `+ ${numGuests - 1} guests`}
					</span>
					<span>&bull;</span>
					<span>{email}</span>
					<span>&bull;</span>
					<span>National ID {nationalID}</span>
				</Guest>
				<DataItem
					label='Observations'
					icon={<HiOutlineChatBubbleBottomCenterText />}>
					<span> Observations</span>
					<span>{observations}</span>
				</DataItem>
				<DataItem
					label='Breakfast included?'
					icon={<HiOutlineCheckCircle />}>
					<span>{hasBreakfast ? 'Yes' : 'No'}</span>
				</DataItem>

				<Price isPaid={isPaid}>
					<DataItem
						label='Total price'
						icon={<HiOutlineCurrencyDollar />}>
						<span>{formatCurrency(totalPrice)}</span>
					</DataItem>
					<span>{isPaid ? 'PAID' : 'WILL PAY AT PROPERTY'}</span>
				</Price>
			</StyledBody>
			<Footer>
				Booked {format(created_at, 'EEE, MMM ddd yyyy HH:mm aaa')}
			</Footer>
		</StyledDataSection>
	);
};

export default BookingDataBox;
