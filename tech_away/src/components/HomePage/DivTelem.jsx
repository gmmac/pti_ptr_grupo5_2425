import React from "react";
import { Stack, Image } from "react-bootstrap";
import Swirl from "../svg/Swirl";
import { Link } from "react-router-dom";

export default function DivTelem(isMobile) {
	return (
		<div
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
				borderRadius: "var(--rounded-lg)",
				WebkitMaskImage: "inset(0 round var(--rounded-lg))",
				maskImage: "inset(0 round var(--rounded-lg))",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Background */}
			<div style={{ position: "absolute", width: "100%", height: "100%" }}>
				{/* SVG no fundo */}
				<Swirl
					w="559"
					h="554"
					vb="0 0 559 554"
					d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
					color="var(--variant-two)"
					strokeWidth="23"
					style={{
						position: "absolute",
						top: "-10",
						left: "10",
						width: "100%",
						height: "100%",
						zIndex: "1",
					}}
				/>

				{/* Imagem sobreposta ao SVG */}
				<Image
					src="../../public/assets/telemovel.png"
					style={{
						position: "absolute",
						top: "75%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: "80%",
						zIndex: "2",
					}}
				/>
			</div>

			{/* Links*/}
			<Stack
				direction="horizontal"
				gap={3}
				style={{
					position: "relative",
					zIndex: "3",
					width: "100%",
					height: "539px",
				}}
				className="px-5 py-4 justify-content-end align-items-end"
			>
				<Link
					screen="store"
					style={{
						backgroundColor: "var(--variant-two)",
						boxShadow: "var(--shadow-default)",
						textDecoration: "none",
						color: "var(--dark-grey)",
						height: "50px",
					}}
					className="px-4 rounded-pill d-flex justify-content-center align-items-center"
				>
					Check our store
				</Link>
				<Link
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						textDecoration: "none",
						color: "var(--dark-grey)",
						width: "50px",
						height: "50px",
					}}
					className="rounded-circle d-flex justify-content-center align-items-center"
				>
					{/* seta */}
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.40029 18.4003L18.373 1.42763M18.373 1.42763L6.40251 2.5973M18.373 1.42763L17.2033 13.3981"
							stroke="#27272D"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>
			</Stack>
		</div>
	);
}
