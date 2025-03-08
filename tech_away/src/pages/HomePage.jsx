import React, { useState, useEffect } from "react";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import "../styles/variables.css";
import SmNavbar from "../components/Navbar/SmNavbar";
import FScontent from "../components/HomePage/FScontent";

const mobileSize = 768;

export default function HomePage() {
	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileSize);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileSize);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			style={{
				backgroundColor: "var(--light-grey)",
				color: "var(--dark-grey)",
			}}
		>
			{isMobile ? <SmNavbar /> : <InitialNavBar />}
			<FScontent />
		</div>
	);
}
