import { useNavigate } from 'react-router';

const useMoveBack = () => {
	const navigate = useNavigate();

	return () => navigate(-1);
};

export default useMoveBack;
