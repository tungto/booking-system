import Modal from '../../ui/Modal';
import EditCabinForm from './CreateEditCabinForm';

const AddCabin = () => {
	return (
		<Modal>
			<Modal.Open opens='cabins-form'>Add New Cabin</Modal.Open>
			<Modal.Window name='cabins-form'>
				<EditCabinForm />
			</Modal.Window>
		</Modal>
	);
};

export default AddCabin;
