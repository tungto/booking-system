import useOutsideClick from '@/hooks/useOutsideClick';
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

type TStyledListProps = {
	position: {
		x: number;
		y: number;
	};
};

const StyledList = styled.ul<TStyledListProps>`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.position.x}px;
	top: ${(props) => props.position.y}px;
`;

type TPosition = {
	x: number;
	y: number;
};

interface TMenusContextProps {
	openId: number;
	close: () => void;
	// todo refactor this type
	open: (id: number) => void;
	position: TPosition | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setPosition: any;
}

const MenusContext = createContext<TMenusContextProps>({
	openId: -1,
	close: () => {},
	open: () => {},
	position: null,
	setPosition: () => {},
});
type TProps = {
	children: React.ReactNode;
};

const Menus = ({ children }: TProps) => {
	const [openId, setOpenId] = useState(-1);
	const [position, setPosition] = useState(null);

	const close = () => setOpenId(-1);
	const open = setOpenId;

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition }}>
			{children}
		</MenusContext.Provider>
	);
};

type ToggleProps = {
	id: number;
};

const Toggle = ({ id }: ToggleProps) => {
	const { openId, open, setPosition, close } = useContext(MenusContext);

	function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.stopPropagation();

		const rect = (e.target as Element)
			?.closest('button')!
			.getBoundingClientRect();

		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		});

		openId === null || openId !== id ? open(id) : close();
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
};

type ListProps = {
	children: React.ReactNode;
	id: number;
};

const List = ({ children, id }: ListProps) => {
	const { openId, close, position } = useContext(MenusContext);
	const ref = useOutsideClick({
		handler: close,
		listenCapturing: false,
	});

	if (openId !== id) return null;

	return createPortal(
		<StyledList position={position as TPosition} ref={ref}>
			{children}
		</StyledList>,
		document.body
	);
};

type TButtonProps = {
	children: React.ReactNode;
	icon?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
};

const Button = ({ children, onClick, disabled, icon }: TButtonProps) => {
	const { close } = useContext(MenusContext);

	function handleClick() {
		onClick?.();
		close();
	}
	return (
		<li>
			<StyledButton onClick={handleClick} disabled={disabled}>
				{icon}
				<span>{children}</span>
			</StyledButton>
		</li>
	);
};

Menus.Toggle = Toggle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;
export default Menus;
