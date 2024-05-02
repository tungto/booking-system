import supabase from './supabase';

export interface Settings {
	id: number;
	created_at: string;
}

export const getSettings = async () => {
	const { data: settings, error } = await supabase
		.from('settings')
		.select('id, minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice').single();

	if (error) {
		console.log('GET SETTINGS ERROR: ', error);
		throw new Error('Settings could not be loaded');
	}

	return settings;
};
