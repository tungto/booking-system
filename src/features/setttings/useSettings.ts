import { getSettings } from '@/services/apiSettings';
import {  useQuery } from '@tanstack/react-query';

const useSettings = () => {
	const {
		isLoading,
		data: settings,
		error,
	} = useQuery({
		queryKey: ['settings'],
		queryFn: getSettings,
	});

	return { settings, error, isLoading };
};

export default useSettings;
