import React from "react";
import "../../styles/variables.css";

export default function Icon({ d }) {
	return (
		<svg
			width="23"
			height="24"
			viewBox="0 0 23 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d={d}
				stroke="var(--dark-grey)"
				stroke-width="2"
				stroke-linecap="round"
			/>
		</svg>
	);
}
