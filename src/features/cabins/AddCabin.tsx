import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import EditCabinForm from './CreateEditCabinForm';

const AddCabin = () => {
	return (
		<div>
			<Modal>
				<Modal.Open opens='cabins-form'>
					<Button>Add New Cabin</Button>
				</Modal.Open>
				<Modal.Window name='cabins-form'>
					<EditCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
};

export default AddCabin;
