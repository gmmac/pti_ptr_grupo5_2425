import React from "react";

export default function Swirl({ w, h, vb, d, color, strokeWidth }) {
	return (
		<svg
			width={w}
			height={h}
			viewBox={vb}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d={d}
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
		</svg>
	);
}