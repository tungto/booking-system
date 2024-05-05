import DashboardLayout from '@/features/dashboard/DashboardLayout';
import Filter from '@/ui/Filter';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';

const Dashboard = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>Dashboard</Heading>
				<Filter
					filterField='last'
					options={[
						{ label: 'Last 7 days', value: '7' },
						{ label: 'Last 30 days', value: '30' },
						{ label: 'Last 90 days', value: '90' },
					]}
				/>
			</Row>
			<DashboardLayout />
		</>
	);
};

export default Dashboard;
