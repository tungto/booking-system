import { updateSettings as updateSettingsApi } from '@/services/apiSettings';
import { SettingRowUpdate } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateSettings = () => {
	const queryClient = useQueryClient();
	const {
		mutate: updateSettings,
		isPending: isUpdating,
		error,
	} = useMutation({
		mutationFn: ({
			id,
			settingsData,
		}: {
			id: number;
			settingsData: SettingRowUpdate;
		}) => updateSettingsApi(id, settingsData),
		onError: () => {
			toast.error('Settings could not be updated');
		},
		onSuccess: () => {
			toast.success('Settings updated successfully');
			queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
	});

	return { updateSettings, isUpdating, error };
};

export default useUpdateSettings;
