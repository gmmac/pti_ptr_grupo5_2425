import React from "react";
import "../../styles/variables.css";

export default function Icon({ d }) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d={d}
				stroke="var(--dark-grey)"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}
