import React, { useContext } from "react"; // Adicionei useContext
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function DivOurServices() {
	const isMobile = useContext(IsMobileContext); // Agora funciona!

	return (
		<Stack
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
			}}
			className={`justify-content-center align-items-center p-3 ${
				isMobile ? "rounded-sm" : "rounded-lg"
			}`}
			gap={4}
			direction="vertical"
		>
			<h3
				style={{
					fontWeight: "bold",
				}}
				className="m-0 fs-3"
			>
				Our Services
			</h3>
			<Stack gap={3}>
				<Stack
					direction="horizontal"
					gap={3}
					className="justify-content-center flex-wrap"
				>
					<Link
						style={{
							textDecoration: "none",
							color: "var(--dark-grey)",
							backgroundColor: "var(--variant-two)",
						}}
						className="rounded-pill px-4 py-2 fs-5 text-center"
					>
						Sell and Buy Equipment
					</Link>
					<Link
						style={{
							textDecoration: "none",
							color: "var(--dark-grey)",
							backgroundColor: "var(--variant-one)",
						}}
						className="rounded-pill px-4 py-2 fs-5 text-center"
					>
						Request Equipment Repair
					</Link>

					<Link
						style={{
							textDecoration: "none",
							color: "var(--dark-grey)",
							backgroundColor: "var(--variant-one)",
						}}
						className="rounded-pill px-4 py-2 fs-5 text-center"
					>
						Create Beneficiary Project
					</Link>
					<Link
						style={{
							textDecoration: "none",
							color: "var(--dark-grey)",
							backgroundColor: "var(--variant-two)",
						}}
						className="rounded-pill px-4 py-2 fs-5 text-center"
					>
						Donate Equipment
					</Link>
				</Stack>
			</Stack>
		</Stack>
	);
}
