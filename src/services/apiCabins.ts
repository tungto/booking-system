/**
 * getCabins
 */

import { Cabin } from '../types';
import supabase from './supabase';

export const getCabins = async (): Promise<Cabin[]> => {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.log('GET CABINS ERROR: ', error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
};

/**
 * Create Cabins
 */

export async function createCabin(cabin: Cabin) {
	const { data, error } = await supabase
		.from('cabins')
		.insert([cabin])
		.select();

	if (error) {
		console.log('CREATE CABIN ERROR', error);
		throw new Error('Cabin could not be deleted');
	}
	return data;
}

/**
 * Edit Cabins
 */

export async function editCabin(id: string, cabin: Cabin) {
	const { data, error } = await supabase
		.from('cabins')
		.update(cabin)
		.eq('id', id)
		.select();

	if (error) {
		console.log('edit CABIN ERROR', error);
		throw new Error('Cabin could not be deleted');
	}

	return data;
}

/**
 * Delete Cabins
 */

export async function deleteCabin(id: string) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.log('DELETE CABIN ERROR', error);
		throw new Error('Cabin could not be deleted');
	}
}
