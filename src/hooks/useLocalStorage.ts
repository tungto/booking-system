import { useEffect, useState } from 'react';

type PropsType<T> = {
	key: string;
	initialValue: T | (() => T);
};
const useLocalStorage = <T>({ initialValue, key }: PropsType<T>) => {
	const [value, setValue] = useState(() => {
		const savedValue = localStorage.getItem(key);
		return savedValue ? JSON.parse(savedValue) : initialValue;
	});

	// each time value change, set new value to local storage
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};

export default useLocalStorage;
