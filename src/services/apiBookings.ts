import { BookingData, TBookingUpdate, Result } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import supabase from './supabase';

type GetAllBookingsParams = {
	filter: {
		method?: string;
		field: string;
		value: string;
	} | null;
	sortBy: { field: string; direction: string };
	page: number;
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

	console.log(booking);

	return booking;
};

export const updateBooking = async (id: number, newBooking: TBookingUpdate) => {
	console.log(newBooking);
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

	console.log(booking);

	return booking;
};

export const deleteBooking = async (id: number) => {
	const { error } = await supabase.from('bookings').delete().eq('id', id);

	if (error) {
		console.log('DELETE BOOKING ERROR', error);
		throw new Error('Can not delete booking');
	}
};
