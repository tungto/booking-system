import { Database } from '@/types/schema';

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

export type Setting = Database['public']['Tables']['settings'];

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
export type BookingData = TBookingRow & {
	guests: Guest;
	cabins: Pick<TCabinRow, 'name'>;
};

export type Result<T> = {
	data: T[];
	count: number;
};

export type Login = {
	email: string;
	password: string;
};

export type SignUp = {
	fullName: string;
	email: string;
	password: string;
	repeatPassword: string;
};

export type UpdateUserData = {
	email: string;
	fullName: string;
	avatar: string;
	password: string;
};

export type Activity = TBookingRow & {
	guests: Omit<Guest, 'nationalID' | 'nationality' | 'email'>;
};

export type Stays = {
	stays: (TBookingRow & { guests: { fullName: string } })[];
};

export type SettingRow = Setting['Row'];
export type SettingRowUpdate = Setting['Update'];
