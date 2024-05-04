import { Login, SignUp, UpdateUserData } from '@/types';
import supabase, { supabaseUrl } from './supabase';

export const login = async ({ email, password }: Login) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.log('LOGIN ERROR: ', error);
		throw new Error('LOGIN ERROR');
	}

	return data;
};

/**
 * If no session return null
 * @returns
 */
export const getCurrentUser = async () => {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	// session doesn't guaranteed to have user, to get logged in user we would use getUser()
	//https://github.com/orgs/supabase/discussions/4400
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.log('GETTING USER ERROR: ', error);
		throw new Error(`GETTING USER ERROR: ${error.message}`);
	}

	return data.user;
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log('LOGOUT ERROR: ', error);
		throw new Error(`LOGOUT ERROR: ${error.message}`);
	}
};

export const signup = async ({ fullName, email, password }: SignUp) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { fullName, avatar: '' } },
	});

	if (error) {
		console.log('SIGNUP ERROR: ', error);
		throw new Error(`SIGN UP ERROR: ${error.message}`);
	}

	return data;
};

export const updateCurrentUser = async ({
	password,
	fullName,
	avatar,
}: Partial<UpdateUserData>) => {
	let updateData = {};
	if (password) updateData = { password };
	if (fullName) updateData = { fullName };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) {
		console.log('UPDATE USER  ERROR: ', error);
		throw new Error(`UPDATE USER  ERROR: ${error.message}`);
	}

	if (!avatar) return data;

	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from('avatars')
		.upload(fileName, avatar[0]);

	if (storageError) throw new Error(storageError.message);

	const { data: updatedUser, error: error2 } = await supabase.auth.updateUser(
		{
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
			},
		}
	);

	if (error2) throw new Error(error2.message);

	return updatedUser;
};
