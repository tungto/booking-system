import styled from 'styled-components';
import useCabins from '../cabins/useCabins';
import Stats from './Stats';
import TodayBookings from './TodayBookings';
import useRecentBookings from './useRecentBookings';
import useRecentStays from './useRecentStays';
import StayChart from './StayChart';
import { Stays } from '@/types';
import SalesChart from './SalesChart';

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { bookings = [] } = useRecentBookings();
	const { confirmedStays = [], numDays } = useRecentStays();
	const { cabins } = useCabins();

	return (
		<StyledDashboardLayout>
			<Stats
				numDays={numDays}
				confirmedStays={confirmedStays}
				cabinCount={cabins?.length || 0}
				bookings={bookings}
			/>
			<TodayBookings />
			<StayChart stays={confirmedStays as Stays['stays']} />
			<SalesChart numDays={numDays} bookings={bookings} />
		</StyledDashboardLayout>
	);
};

export default DashboardLayout;
