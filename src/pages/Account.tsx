import UpdatePasswordForm from '@/features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '@/features/authentication/UpdateUserDataForm';
import Heading from '@/ui/Heading';
import Row from '@/ui/Row';

const Account = () => {
	return (
		<>
			<Heading as='h1'>Update your account</Heading>

			<Row type='vertical'>
				<Heading as='h3'>Update Account</Heading>
				<UpdateUserDataForm />
			</Row>
			<Row type='vertical'>
				<Heading as='h3'>Update Password</Heading>
				<UpdatePasswordForm />
			</Row>
		</>
	);
};

export default Account;
