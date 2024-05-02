import { getAllBookings } from '@/services/apiBookings';
import { PAGE_SIZE } from '@/utils/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const useBookings = () => {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// FILTER
	const filterValue = searchParams.get('status') || 'all';
	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'status', value: filterValue };

	//  SORT
	const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
	const [field, direction] = sortByRaw.split('-');
	const sortBy = { field, direction };

	// PAGINATION
	const page = !searchParams.get('page')
		? 1
		: Number(searchParams.get('page'));

	const {
		isLoading,
		error,
		data: { data = [], count = 0 } = {},
	} = useQuery({
		queryKey: ['bookings', filter, sortBy, page],
		queryFn: () => getAllBookings({ filter, sortBy, page }),
	});

	const pageCount = Math.ceil(count! / PAGE_SIZE);

	//PREFETCH QUERY
	if (page < pageCount) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page + 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ['bookings', filter, sortBy, page - 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
		});
	}

	useEffect(() => {});

	return {
		isLoading,
		error,
		bookings: data,
		count: count,
	};
};

export default useBookings;
