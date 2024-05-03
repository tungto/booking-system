import SignUpForm from '@/features/authentication/SignUpForm';
import Heading from '@/ui/Heading';

const User = () => {
	return (
		<>
			<Heading as='h1'>Create a new user</Heading>
			<SignUpForm />;
		</>
	);
};

export default User;
