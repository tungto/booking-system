import { BookingData, TBookingUpdate, Result } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import supabase from './supabase';
import { getToday } from '@/utils/helpers';

type GetAllBookingsParams = {
	filter?: {
		method?: string;
		field: string;
		value: string | number;
	};
	sortBy?: { field: string; direction: string };
	page?: number;
};

/**
 * FILTER
 * https://supabase.com/docs/reference/javascript/eq
 * @param param0
 * @returns
 */
export const getAllBookings = async ({
	filter,
	sortBy,
	page,
}: GetAllBookingsParams): Promise<Result<BookingData>> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let bookingsQuery: any = supabase
		.from('bookings')
		.select(' *, cabins(name), guests(fullName, email)', {
			count: 'exact',
		});

	if (filter)
		bookingsQuery = bookingsQuery[filter.method || 'eq'](
			filter.field,
			filter.value
		);

	if (sortBy)
		bookingsQuery = bookingsQuery.order(sortBy.field, {
			ascending: sortBy.direction === 'asc',
		});

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + (PAGE_SIZE - 1);
		bookingsQuery = bookingsQuery.range(from, to);
	}

	const { data, error, count } = await bookingsQuery;

	if (error) {
		console.log('GET ALL BOOKINGS ERROR', error);
		throw new Error('Can not get all bookings');
	}

	return { data, count };
};

export const getBooking = async (id: string) => {
	const { data: booking, error } = await supabase
		.from('bookings')
		.select(
			'*, guests(fullName, email, nationalID, countryFlag), cabins(name)'
		)
		// Filters
		.eq('id', id)
		.single();

	if (error) {
		console.log('GET BOOKING ERROR', error);
		throw new Error('Can not get booking');
	}

	return booking;
};

export const updateBooking = async (id: number, newBooking: TBookingUpdate) => {
	const { data: booking, error } = await supabase
		.from('bookings')
		.update({ ...newBooking })
		.eq('id', id)
		.select()
		.single();

	if (error) {
		console.log('UPDATE BOOKING ERROR', error);
		throw new Error('Can not update booking');
	}

	return booking;
};

export const deleteBooking = async (id: number) => {
	const { error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.log('DELETE BOOKING ERROR', error);
		throw new Error('Can not delete booking');
	}
};

/**
 * from query date to today
 * @param queryDate
 * @returns
 */
export const getBookingsAfterDate = async (queryDate: string) => {
	const { data: bookings, error } = await supabase
		.from('bookings')
		.select('created_at, totalPrice, extrasPrice')
		// Filters
		.gte('created_at', queryDate)
		.lte('created_at', getToday({ end: true }));

	if (error) {
		console.log('GET BOOKINGS AFTER DATE ERROR', error);
		throw new Error('Can not delete bookings');
	}

	console.log('bookings', bookings);

	return bookings;
};

/**
 * All stay that were created after the given date
 * @param queryDate
 * @returns
 */
export const getStayAfterDate = async (queryDate: string) => {
	const { data: bookings, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName)')
		// Filters
		.gte('startDate', queryDate)
		.lte('startDate', getToday());

	if (error) {
		console.log('GET BOOKINGS AFTER DATE ERROR', error);
		throw new Error('Can not delete bookings');
	}

	console.log('bookings', bookings);

	return bookings;
};

// get bookings will check in or check out today
export const getTodayBookings = async () => {
	const { data: bookings, error } = await supabase
		.from('bookings')
		.select('*, guests(fullName, nationality, countryFlag)')
		// Filters
		.or(
			`and(status.eq.unconfirmed, startDate.eq.${getToday()}), and(status.eq.checked-in, startDate.eq.${getToday()})`
		)
		.order('created_at');

	if (error) {
		console.log('GET TODAY BOOKINGS  ERROR', error);
		throw new Error('Can not today bookings');
	}

	return bookings;
};
