import Button from '@/ui/Button';
import useCheckout from './useCheckout';
import { ReactNode } from 'react';

const CheckoutButton = ({
	id,
	children,
	size,
}: {
	id: number;
	children: ReactNode;
	size: string;
}) => {
	const { isCheckingOut, checkout } = useCheckout();
	return (
		<Button
			variation='primary'
			onClick={() => checkout(id)}
			disabled={isCheckingOut}
			size={size as 'small' | 'medium' | 'large'}>
			{children}
		</Button>
	);
};

export default CheckoutButton;
