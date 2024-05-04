import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface IDarkModeContext {
	toggleDarkMode: () => void;
	isDarkMode: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
const DarkModeContext = createContext<IDarkModeContext>({
	toggleDarkMode: () => {},
	isDarkMode: false,
});

export const DarkModeProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// 1. set mode base on user's prefer color scheme
	// https://www.30secondsofcode.org/js/s/prefers-color-scheme/#:~:text=Check%20if%20user%20prefers%20a,in%20their%20operating%20system%20settings.
	const [isDarkMode, setIsDarkMode] = useLocalStorage({
		initialValue: window.matchMedia('(prefers-color-scheme: dark)').matches,
		key: 'isDarkMode',
	});

	console.log(isDarkMode);

	//2. toggle dark mode
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark-mode');
			document.documentElement.classList.remove('light-mode');
		} else {
			document.documentElement.classList.remove('dark-mode');
			document.documentElement.classList.add('light-mode');
		}
	}, [isDarkMode]);

	function toggleDarkMode() {
		setIsDarkMode((mode: boolean) => !mode);
	}

	return (
		<DarkModeContext.Provider value={{ toggleDarkMode, isDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error(
			'DarkModeContext was using outside of DarkModeProvider'
		);
	}
	return context;
};
