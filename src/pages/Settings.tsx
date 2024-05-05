import EditSettingsForm from '@/features/setttings/EditSettingsForm';
import Heading from '@/ui/Heading';

const Settings = () => {
	return (
		<>
			<Heading as='h1'>Update hotel settings</Heading>
			<EditSettingsForm />
		</>
	);
};

export default Settings;
