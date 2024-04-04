import styled from 'styled-components';
import { Cabin } from '../../types';
import useCreateCabin from './useCreateCabin';
import useDeleteCabin from './useDeleteCabin';

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

const CabinRow = (props: Cabin) => {
	const {
		id,
		image,
		name,
		maxCapacity,
		regularPrice,
		discount,
		description,
	} = props;

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
			<Img src={image} alt={name} />
			<CabinName>{name}</CabinName>
			<span>{maxCapacity}</span>
			<span>{regularPrice}</span>
			<span>{discount}</span>
			<Menu>
				<button>Edit</button>
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
