import Spinner from '@/ui/Spinner';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useUser from './useUser';
import { useEffect } from 'react';

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

type ProtectedRouteProps = {
	children: React.ReactNode;
};
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	//1. get user
	const { isLoading, isAuthenticated, fetchStatus } = useUser();
	const navigate = useNavigate();

	console.log(fetchStatus);

	useEffect(
		function () {
			//3. if user un-authenticated navigate to login
			// * need to check fetchStatus too
			if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching') {
				navigate('/login');
			}
		},
		[isAuthenticated, navigate, isLoading, fetchStatus]
	);

	//2. while loading => show spinner
	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	//4. if there is a user - render the app
	if (isAuthenticated) {
		return children;
	}
};

export default ProtectedRoute;
