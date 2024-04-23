import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateEditCabinForm from './CreateEditCabinForm';

const AddCabin = () => {
	return (
		<div>
			<Modal>
				<Modal.Open opens='cabins-form'>
					<Button>Add New Cabin</Button>
				</Modal.Open>
				<Modal.Window name='cabins-form'>
					<CreateEditCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
};

export default AddCabin;
