import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

const useCabins = () => {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ['cabins'],
		queryFn: getCabins,
		staleTime: 1000 * 60,
	});

	console.log(cabins);
	return { isLoading, cabins, error };
};

export default useCabins;
