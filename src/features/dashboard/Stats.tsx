import { formatCurrency } from '@/utils/helpers';
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { TBookingRow } from '@/types';

type Stats = {
	bookings: {
		created_at: string;
		totalPrice: number;
		extrasPrice: number | null;
	}[];
	cabinCount: number;
	numDays: number;
	confirmedStays: TBookingRow[];
};

const Stats = ({ bookings, numDays, cabinCount, confirmedStays }: Stats) => {
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// confirmed stay = checked in / checked out
	const checkIns = confirmedStays.length;

	const numBookings = bookings.length;

	// total booking nights / numdays * total cabin num
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title='Booking'
				value={numBookings}
				color='blue'
				icon={<HiOutlineBriefcase />}
			/>
			<Stat
				title='Sales'
				value={formatCurrency(sales)}
				color='green'
				icon={<HiOutlineBanknotes />}
			/>
			<Stat
				title='Check Ins'
				value={checkIns}
				color='indigo'
				icon={<HiOutlineCalendarDays />}
			/>
			<Stat
				title='Occupancy Rate'
				value={Math.round(occupation * 100) + '%'}
				color='yellow'
				icon={<HiOutlineChartBar />}
			/>
		</>
	);
};

export default Stats;
