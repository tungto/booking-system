import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

type ConfirmDeleteProps = {
	resourceName: string;
	onConfirm: () => void;
	onCloseModal?: () => void;
	disabled: boolean;
};

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.6rem;

	& div {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}
`;

const ConfirmDelete = ({
	resourceName,
	onConfirm,
	disabled,
	onCloseModal,
}: ConfirmDeleteProps) => {
	return (
		<StyledConfirmDelete>
			<Heading as={'h3'}>Delete {resourceName} </Heading>
			<p>
				Are you sure you want to delete this {resourceName} permanently?
				This action cannot be undone.
			</p>

			<div>
				<Button
					variation='danger'
					onClick={onConfirm}
					disabled={disabled}>
					Delete
				</Button>
				<Button disabled={disabled} onClick={onCloseModal}>
					Cancel
				</Button>
			</div>
		</StyledConfirmDelete>
	);
};

export default ConfirmDelete;
