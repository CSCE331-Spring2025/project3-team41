// Design a button in the bottom right corner of the screen that will switch the theme of the page from light to dark and vice versa. The button should have a sun icon for light mode and a moon icon for dark mode. The button should be styled with a gradient background and rounded corners. The button should also have a hover effect that changes the background color slightly. The button should be positioned in the bottom right corner of the screen, above the footer. The button should be responsive and adjust its size based on the screen size.
import * as React from "react";
import { Button } from "@/components/ui/button";

export function Contrast() {
	const [isDarkMode, setIsDarkMode] = React.useState(false);

	React.useEffect(() => {
		// Add or remove the "dark" class on the <html> element
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-2 right-4 z-50 rounded-full p-2 transition-colors bg-yellow-200 text-black dark:bg-gray-200 dark:text-white"
		>
			{isDarkMode ? "🌙" : "☀️"}
		</button>
	);
}
