import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Login from './pages/Login';
import AppLayout from './ui/AppLayout';
import User from './pages/User';
import Settings from './pages/Settings';
import PageNotFound from './pages/PageNotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { StyleSheetManager } from 'styled-components';
import emotionIsPropValid from '@emotion/is-prop-valid';
import CheckIn from './pages/CheckIn';
import Booking from './pages/Booking';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 20 * 1000,
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StyleSheetManager shouldForwardProp={shouldForwardProp}>
					<ReactQueryDevtools initialIsOpen={false} />
					<GlobalStyles />
					<BrowserRouter>
						<Routes>
							<Route element={<AppLayout />}>
								<Route
									index
									element={
										<Navigate replace to='dashboard' />
									}
								/>
								<Route
									path='dashboard'
									element={<Dashboard />}
								/>
								<Route path='bookings' element={<Bookings />} />
								<Route
									path='bookings/:bookingId'
									element={<Booking />}
								/>
								<Route
									path='checkin/:bookingId'
									element={<CheckIn />}
								/>
								<Route path='cabins' element={<Cabins />} />
								<Route path='login' element={<Login />} />
								<Route path='user' element={<User />} />
								<Route path='settings' element={<Settings />} />
								<Route path='*' element={<PageNotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>

					<Toaster />
				</StyleSheetManager>
			</QueryClientProvider>
		</>
	);
}

// This implements the default behavior from styled-components v5
// https://styled-components.com/docs/faqs#shouldforwardprop-is-no-longer-provided-by-default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shouldForwardProp(propName: string, target: any) {
	if (typeof target === 'string') {
		// For HTML elements, forward the prop if it is a valid HTML attribute
		return emotionIsPropValid(propName);
	}
	// For other elements, forward all props
	return true;
}

export default App;
