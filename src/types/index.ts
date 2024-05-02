import { Database, Tables } from '@/types/schema';

export enum CabinsSortOptions {
	regularPriceASC = 'regularPrice-asc',
	regularPriceDSC = 'regularPrice-dsc',
	nameAsc = 'name-asc',
	nameDsc = 'name-dsc',
	maxCapacityAsc = 'maxCapacity-asc',
	maxCapacityDSC = 'maxCapacity-dsc',
}
export enum CabinFilterOptions {
	all = 'all',
	withDiscount = 'with-discount',
	noDiscount = 'no-discount',
}

export type CabinField = keyof Cabin;

export type Cabin = Database['public']['Tables']['cabins'];

export type TCabinRow = Cabin['Row'];
type Image = {
	image: string | [File] | null;
};

export type TCabinUpdate = Cabin['Update'] & Image;

export type TCabinInsert = Cabin['Insert'] & Image;

export type Booking = Database['public']['Tables']['bookings'];
export type TBookingRow = Booking['Row'];
export type TBookingInsert = Booking['Insert'];
export type TBookingUpdate = Booking['Update'];

export type Setting = Tables<'settings'>;

export interface Guest {
	fullName: string;
	email: string;
	nationalID: string;
	countryFlag: string;
	nationality: string;
}

export enum BookingStatus {
	unconfirmed = 'unconfirmed',
	checkedOut = 'checked-out',
	checkedIn = 'checked-in',
}

// !todo refactor
export type BookingData = Booking['Row'] & {
	guests: Guest;
	cabins: Pick<TCabinRow, 'name'>;
};

export type Result<T> = {
	data: T[];
	count: number;
};
