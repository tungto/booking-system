import { useDarkMode } from '@/context/DarkModeContext';
import { TBookingRow } from '@/types';
import Row from '@/ui/Row';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import styled from 'styled-components';

const StyledSalesChart = styled.div`
	grid-column: 1 / -1;
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 3.2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
`;

const SalesChart = ({
	numDays,
	bookings,
}: {
	numDays: number;
	bookings: Pick<TBookingRow, 'created_at' | 'totalPrice' | 'extrasPrice'>[];
}) => {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});
	const { isDarkMode } = useDarkMode();
	const fromDate = formatSaleDate(allDates.at(0)?.toISOString() || '');
	const toDate = formatSaleDate(allDates.at(-1)?.toISOString() || '');

	const data = allDates.map((item) => {
		return {
			label: format(item, 'LLL dd'),
			totalSales: bookings
				.filter((booking) =>
					isSameDay(new Date(booking.created_at), item)
				)
				.reduce((acc, cur) => acc + cur.totalPrice, 0),

			extrasSales: bookings
				.filter((booking) =>
					isSameDay(new Date(booking.created_at), item)
				)
				.reduce((acc, cur) => acc + cur?.extrasPrice, 0),
		};
	});

	const colors = isDarkMode
		? {
				totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
				extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
				text: '#e5e7eb',
				background: '#18212f',
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		: {
				totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
				extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
				text: '#374151',
				background: '#fff',
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  };

	function formatSaleDate(date: string) {
		return format(date, 'LLL dd yyyy');
	}

	return (
		<StyledSalesChart>
			<Row type='horizontal'>{`Sales from ${fromDate} — ${toDate}
`}</Row>
			<ResponsiveContainer width='100%' height={400}>
				<LineChart
					width={730}
					height={250}
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='label' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line
						type='monotone'
						dataKey='totalSales'
						name='Total Sales'
						stroke={colors.totalSales.stroke}
					/>
					<Line
						name='Extras Sales'
						type='monotone'
						dataKey='extrasSales'
						stroke={colors.extrasSales.stroke}
					/>
				</LineChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
};

export default SalesChart;
