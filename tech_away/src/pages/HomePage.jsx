import React, {useContext } from "react";
import "../styles/variables.css";
import FScontent from "../components/HomePage/FScontent";
import SMcontent from "../components/HomePage/SMcontent";
import { IsMobileContext } from "../contexts/IsMobileContext";


export default function HomePage() {
	const isMobile = useContext(IsMobileContext);

	return (
		<div
			style={{
				backgroundColor: "var(--light-grey)",
				color: "var(--dark-grey)",
			}}
		>
			{isMobile ? (
				<SMcontent />
			) : (
				<FScontent  />
			)}
		</div>
	);
}
