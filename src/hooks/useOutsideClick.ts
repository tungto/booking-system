import { useEffect, useRef } from 'react';

/**
 * https://www.robinwieruch.de/react-hook-detect-click-outside-component/
 */

type HookProps = {
	handler: () => void;
	listenCapturing?: boolean;
};

/***
 * modal is attached to body as we using createPortal
 * => click on buttons is click outside of the modal => handler (close) called
 * To handle this issue we listen for capturing phase instead of bubbling phase
 */
const useOutsideClick = ({ handler, listenCapturing = true }: HookProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = ({ target }: MouseEvent) => {
			if (ref.current && !ref.current.contains(target as Node)) {
				handler();
			}
		};

		document.addEventListener('click', handleClick, listenCapturing);
		return () =>
			document.removeEventListener('click', handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
};

export default useOutsideClick;
