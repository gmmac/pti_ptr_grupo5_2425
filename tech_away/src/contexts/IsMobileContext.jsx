import { createContext, useEffect, useState } from "react";

export const IsMobileContext = createContext();

const screenSize = 999;

export const IsMobileProvider = ({ children }) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < screenSize);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < screenSize);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<IsMobileContext.Provider value={isMobile}>
			{children}
		</IsMobileContext.Provider>
	);
};