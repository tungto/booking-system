import { Login, SignUp } from '@/types';
import supabase from './supabase';

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
