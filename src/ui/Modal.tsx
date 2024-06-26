import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	position: absolute;
	right: 2rem;
`;

type ModalProps = { children: React.ReactNode };

type ModalContextType = {
	open?: (name: string) => void;
	close?: () => void;
	openName: string;
};

const ModalContext = createContext<ModalContextType>({ openName: '' });

const Modal = ({ children }: ModalProps) => {
	const [openName, setOpenName] = useState('');

	const open = setOpenName;
	function close() {
		setOpenName('');
	}

	return (
		<ModalContext.Provider value={{ open, close, openName }}>
			{children}
		</ModalContext.Provider>
	);
};

type OpenProps = {
	children: React.ReactElement;
	opens: string;
};

const Open = ({ children, opens: opensWindowName }: OpenProps) => {
	const { open } = useContext(ModalContext);

	return cloneElement(children, { onClick: () => open?.(opensWindowName) });
};

type WindowProps = {
	children: React.ReactElement;
	name: string;
};

function Window({ children, name }: WindowProps) {
	const { openName, close } = useContext(ModalContext);
	const ref = useOutsideClick({ handler: close! });

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				<div>
					{cloneElement(children, {
						onCloseModal: close,
					})}
				</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
