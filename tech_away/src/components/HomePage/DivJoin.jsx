import React, { useContext } from "react";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function DivJoin() {
	const isMobile = useContext(IsMobileContext);

	return (
		<Stack
			style={{
				backgroundColor: "var(--variant-one)",
				boxShadow: "var(--shadow-default)",
			}}
			className={`justify-content-center align-items-center py-4 px-2 ${
				isMobile ? "rounded-sm" : "rounded-lg"
			}`}
		>
			<p className="fs-3 text-center">100k + people joined the plataform</p>
			<Link style={{ textDecoration: "none" }}>
				<Stack
					direction="horizontal"
					gap={2}
					style={{
						backgroundColor: "var(--dark-grey)",
						color: "var(--dark-grey)",
					}}
					className="px-4 py-1 rounded-pill justify-content-center align-items-center"
				>
					<p
						className="m-0 fs-5"
						style={{
							color: "var(--light-grey",
						}}
					>
						Join
					</p>
					<svg
						width="18"
						height="12"
						viewBox="0 0 18 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1 6H16.5M16.5 6L10.5 1M16.5 6L10.5 11"
							stroke="#E7E7E7"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Stack>
			</Link>
		</Stack>
	);
}
