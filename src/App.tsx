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

function App() {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route
							index
							element={<Navigate replace to='dashboard' />}
						/>
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='bookings' element={<Bookings />} />
						<Route path='cabins' element={<Cabins />} />
						<Route path='login' element={<Login />} />
						<Route path='user' element={<User />} />
						<Route path='settings' element={<Settings />} />
						<Route path='*' element={<PageNotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
