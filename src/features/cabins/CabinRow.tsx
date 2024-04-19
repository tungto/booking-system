import styled from 'styled-components';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';
import Modal from '../../ui/Modal';
import EditCabinForm from './CreateEditCabinForm';
import Button from '../../ui/Button';
import { Cabin } from './type';

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
`;

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

	function handDeleteCabin() {
		deleteCabin(id!);
	}

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
		<TableRow>
			<Img src={image as string} alt={name} />
			<CabinName>{name}</CabinName>
			<span>{maxCapacity}</span>
			<span>{regularPrice}</span>
			<span>{discount}</span>
			<Menu>
				<Modal>
					<Modal.Open opens='edit-cabin'>
						<Button>Edit</Button>
					</Modal.Open>
					<Modal.Window name='edit-cabin'>
						<EditCabinForm cabin={cabin} />
					</Modal.Window>
				</Modal>

				<button onClick={handDeleteCabin} disabled={isDeleting}>
					Delete
				</button>
				<button onClick={handCreateCabin} disabled={isCreating}>
					Duplicate
				</button>
			</Menu>
		</TableRow>
	);
};

export default CabinRow;
