import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';
import Spinner from '@/ui/Spinner';

function Logout() {
	const { isPending, logoutPerform } = useLogout();

	return (
		<ButtonIcon disabled={isPending} onClick={logoutPerform}>
			{!isPending ? <HiArrowRightOnRectangle /> : <Spinner />}
		</ButtonIcon>
	);
}

export default Logout;
