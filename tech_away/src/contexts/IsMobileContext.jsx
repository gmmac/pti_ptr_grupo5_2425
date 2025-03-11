import { createContext, useEffect, useState } from "react";

export const IsMobileContext = createContext();

export const IsMobileProvider = ({ children }) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
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
