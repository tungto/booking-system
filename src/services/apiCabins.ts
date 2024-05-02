/**
 * getCabins
 */

import { TCabinInsert, TCabinUpdate } from '@/types';
import supabase, { supabaseUrl } from './supabase';

export const getCabins = async ()  => {
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

export async function createCabin(cabin: TCabinInsert) {
	const imageName = createFileName(cabin.image?.[0] as unknown as File);
	const imagePath = createFilePath('cabin-images', imageName);

	// 1. insert cabin
	const query = supabase
		.from('cabins')
		.insert([{ ...cabin, image: imagePath }]);

	const { data, error } = await query.select().single();

	if (error) {
		console.log('CREATE CABIN ERROR', error);
		throw new Error('Cabin could not be created');
	}

	// 2. upload image
	const result = await uploadImage(cabin.image?.[0] as unknown as File, imageName);

	// if image upload failed, then delete inserted cabin
	if (!(result as { path: string }).path) {
		await deleteCabin(data.id );
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

/**
 * Edit Cabins
 */
export async function editCabin(  cabin: TCabinUpdate) {
	// check if add new image or not
	const hasPath = (cabin.image as string)?.startsWith?.(supabaseUrl);
	let imageName = '';
	let imagePath = cabin.image;

	if (!hasPath) {
		imageName = createFileName(cabin.image?.[0] as File);
		imagePath = createFilePath('cabin-images', imageName);

		const result = await uploadImage(cabin.image?.[0] as File, imageName);

		if (!(result as { path: string }).path) {
			throw new Error('Could not upload image');
		}
	}

	const { data, error } = await supabase
		.from('cabins')
		.update({ ...cabin, image: imagePath })
		.eq('id', cabin.id as number)
		.select()
		.single();

	if (error) {
		console.log('edit CABIN ERROR', error);
		throw new Error('Cabin could not be edited');
	}

	return data;
}

/**
 * Delete Cabins
 */
export async function deleteCabin(id: number) {
	const { error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.log('DELETE CABIN ERROR', error);
		throw new Error('Cabin could not be deleted');
	}
}

/**
 * file name should not contains any '/', it would cause create new folder
 * file name should be unique
 * @param file
 * @param imageName
 */
async function uploadImage(file: File, imageName: string) {
	const { error, data: uploadedImage } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, file, {
			cacheControl: '3600',
			upsert: false,
		});

	if (error) {
		console.log('UPLOAD IMAGE FAILED: ', error);
		return error;
	}

	return uploadedImage;
}

const createFileName = (file: File) => {
	return `${Math.random()}-${file.name}`.replaceAll('/', '');
};

const createFilePath = (folderName: string, fileName: string) => {
	return `${supabaseUrl}/storage/v1/object/public/${folderName}/${fileName}`;
};
