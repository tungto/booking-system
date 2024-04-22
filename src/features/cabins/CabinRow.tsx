import styled from 'styled-components';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';
import Modal from '../../ui/Modal';
import EditCabinForm from './CreateEditCabinForm';
import Button from '../../ui/Button';
import { Cabin } from './type';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const CabinName = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Menu = styled.div`
	display: flex;
`;

type CabinRowProps = {
	cabin: Cabin;
};

const CabinRow = ({ cabin }: CabinRowProps) => {
	const {
		id,
		image,
		name,
		maxCapacity,
		regularPrice,
		discount,
		description,
	} = cabin;

	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	function handCreateCabin() {
		createCabin({
			image,
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			description,
		});
	}

	return (
		<Table.Row>
			<Img src={image as string} alt={name} />
			<CabinName>{name}</CabinName>
			<span>Fits up to {maxCapacity} guests</span>
			<span>${regularPrice}</span>
			<span>{discount > 0 ? `$${discount}` : '_'}</span>
			<Menu>
				<Modal>
					<Modal.Open opens='edit'>
						<Button>Edit</Button>
					</Modal.Open>
					<Modal.Open opens='delete'>
						<button>Delete</button>
					</Modal.Open>

					<Modal.Window name='edit'>
						<EditCabinForm cabin={cabin} />
					</Modal.Window>

					{/* After cabin deleted => the CabinRow deleted => Modal inside deleted */}
					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName={cabin.name}
							disabled={isDeleting}
							onConfirm={() => deleteCabin(id!)}
						/>
					</Modal.Window>
				</Modal>

				<div>
					<button onClick={handCreateCabin} disabled={isCreating}>
						Duplicate
					</button>
				</div>
			</Menu>
		</Table.Row>
	);
};

export default CabinRow;
