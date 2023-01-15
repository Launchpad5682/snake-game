import {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
	useState,
} from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '../../styles/theme';

export type ColorsType = {
	primary: string;
	secondary: string;
	background: string;
	text: string;
};
interface ThemeContextInterface {
	theme: 'dark' | 'light';
	colors: ColorsType;
	toggleTheme: () => void;
}

export const themeInitialValue: ThemeContextInterface = {
	theme: 'dark',
	colors: darkTheme.color,
	toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextInterface>(themeInitialValue);

export const useThemeContext = () => useContext(ThemeContext);

export function ThemeProvider({
	children,
}: {
	children: ReactElement | ReactNode;
}): ReactElement {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark');

	const toggleTheme = () =>
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return (
		<ThemeContext.Provider
			// eslint-disable-next-line react/jsx-no-constructed-context-values
			value={{
				theme,
				colors: (theme === 'dark'
					? darkTheme.color
					: lightTheme.color) as ColorsType,
				toggleTheme,
			}}
		>
			<EmotionThemeProvider
				theme={theme === 'dark' ? darkTheme.color : lightTheme.color}
			>
				{children}
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
}
