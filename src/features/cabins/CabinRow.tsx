import { TCabinRow } from '@/types';
import {
	HiDocumentDuplicate,
	HiMiniPencilSquare,
	HiMiniTrash,
} from 'react-icons/hi2';
import styled from 'styled-components';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import Table from '../../ui/Table';
import CreateEditCabinForm from './CreateEditCabinForm';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';

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

type CabinRowProps = {
	cabin: TCabinRow;
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

			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabin.id!} />
						<Menus.List id={cabin.id!}>
							<Menus.Button
								onClick={handCreateCabin}
								disabled={isCreating}
								icon={<HiDocumentDuplicate />}>
								Duplicate
							</Menus.Button>

							<Modal.Open opens='edit'>
								<Menus.Button icon={<HiMiniPencilSquare />}>
									Edit
								</Menus.Button>
							</Modal.Open>
							<Modal.Open opens='delete'>
								<Menus.Button icon={<HiMiniTrash />}>
									Delete
								</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='edit'>
							<CreateEditCabinForm cabin={cabin} />
						</Modal.Window>

						{/* After cabin deleted => the CabinRow deleted => Modal inside deleted */}
						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName={cabin.name}
								disabled={isDeleting}
								onConfirm={() => deleteCabin(id!)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
};

export default CabinRow;
