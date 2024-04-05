import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import Button from './Button';

type ModalProps = { children: React.ReactNode };

type ModalContextType = {
	open?: (name: string) => void;
	close?: () => void;
	openName: string;
};

const ModalContext = createContext<ModalContextType>({ openName: '' });

const Modal = ({ children }: ModalProps) => {
	const [openName, setOpenName] = useState('');

	function open(name: string) {
		setOpenName(name);
	}

	function close() {
		setOpenName('');
	}

	return createPortal(
		<ModalContext.Provider value={{ open, close, openName }}>
			{children}
		</ModalContext.Provider>,
		document.body
	);
};

type OpenProps = {
	children: React.ReactNode;
	opens: string;
};

const Open = ({ children, opens: openWindowName }: OpenProps) => {
	const { open } = useContext(ModalContext);

	return <button onClick={() => open?.(openWindowName)}>{children}</button>;
};

type WindowProps = {
	children: React.ReactNode;
	name: string;
};

function Window({ children, name }: WindowProps) {
	const { openName, close } = useContext(ModalContext);

	if (name !== openName) return null;

	return createPortal(
		<>
			<div>
				<Button onClick={close}>
					<HiXMark />
				</Button>

				<button onClick={() => close}>{children}</button>
			</div>
		</>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
