import React from "react";
import { Container, Stack, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function FScontent() {
	return (
		<Container className="vh-100">
			<Stack
				direction="horizontal"
				style={{
					backgroundColor: "var(--white)",
					boxShadow: "var(--shadow-default)",
					borderRadius: "var(--rounded-lg)",
					height: "250px",
					WebkitMaskImage: "inset(0 round var(--rounded-lg))",
					maskImage: "inset(0 round var(--rounded-lg))",
				}}
				className="mt-4 justify-content-between overflow-hidden"
			>
				<svg
					width="253"
					height="389"
					viewBox="0 0 253 389"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M240.566 22.7001C218.287 8.41487 166.444 5.04993 152.063 32.1988C133.394 67.4432 142.824 118.261 178.926 139.197C190.295 145.789 203.799 149.326 215.163 140.831C222.521 135.332 219.221 124.208 215.485 117.576C206.414 101.471 180.357 91.002 163.506 87.7744C132.58 81.8509 101.705 98.9624 84.3824 123.507C51.629 169.916 70.3166 250.048 129.66 262.772C141.037 265.212 157.358 260.82 160.724 248.012C164.571 233.372 151.3 215.161 140.56 206.823C102.823 177.531 46.0862 197.861 22.8449 235.403C-5.47404 281.147 25.5272 338.999 53.6548 376.63"
						stroke="#708C7E"
						stroke-width="23"
						stroke-linecap="round"
					/>
				</svg>
				<h1
					style={{
						fontSize: "64px",
					}}
				>
					Second{" "}
					<span
						style={{
							color: "var(--variant-one)",
						}}
					>
						Life
					</span>{" "}
					Quality{" "}
					<span
						style={{
							color: "var(--variant-two)",
						}}
					>
						Tech
					</span>
				</h1>
				<svg
					width="249"
					height="310"
					viewBox="0 0 249 310"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.9177 294.88C41.8095 298.335 71.6387 302.409 97.5961 287.88C124.356 272.903 137.825 246.854 124.516 215.399C116.369 196.142 98.2468 180.514 77.5424 177.021C68.599 175.513 59.8333 176.442 54.134 182.891C49.0756 188.614 59.7516 196.136 64.3429 199.092C86.719 213.497 111.517 216.403 136.278 215.117C167.883 213.476 196.421 203.511 209.916 174.505C228.661 134.217 222.829 62.0546 170.44 40.1992C156.311 34.305 135.394 25.134 121.333 32.3274C112.323 36.9367 109.14 45.928 113.928 56.11C120.644 70.3901 139.504 80.3518 153.556 84.6747C172.238 90.4217 194.681 89.3446 208.519 77.0856C219.288 67.5454 239.445 27.8798 236.438 12.2534"
						stroke="#B5A8C9"
						stroke-width="23"
						stroke-linecap="round"
					/>
				</svg>
			</Stack>

			<Stack direction="horizontal" style={{ fontFamily: "var(--body-font)" }}>
				<div
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "var(--rounded-lg)",
						width: "564px",
						height: "539px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
					className="mt-4 "
				>
					{/* Background */}
					<div style={{ position: "absolute", width: "100%", height: "100%" }}>
						{/* SVG no fundo */}
						<svg
							width="559"
							height="554"
							viewBox="0 0 559 554"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							style={{
								position: "absolute",
								top: "-10",
								left: "10",
								width: "100%",
								height: "100%",
								zIndex: "1", // Está mais atrás
							}}
						>
							<path
								d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
								stroke="#B5A8C9"
								strokeWidth="23"
								strokeLinecap="round"
							/>
						</svg>

						{/* Imagem sobreposta ao SVG */}
						<Image
							src="../../public/assets/telemovel.png"
							style={{
								position: "absolute",
								top: "75%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								maxWidth: "80%",
								zIndex: "2", // Sobre o SVG
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
							width: "564px",
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

				<Stack className="mt-4 ms-4" gap={4}>
					<Stack
						style={{
							backgroundColor: "var(--variant-one)",
							boxShadow: "var(--shadow-default)",
							borderRadius: "var(--rounded-lg)",
						}}
						className="justify-content-center align-items-center"
					>
						<p style={{ fontSize: "32px" }}>
							100k + people joined the plataform
						</p>
						<Link style={{ textDecoration: "none" }}>
							<Stack
								direction="horizontal"
								gap={2}
								style={{
									backgroundColor: "var(--dark-grey)",
									color: "var(--dark-grey)",
									fontSize: "20px",
								}}
								className="px-4 py-1 rounded-pill justify-content-center align-items-center"
							>
								<p
									className="m-0"
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
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</Stack>
						</Link>
					</Stack>

					<Stack
						style={{
							backgroundColor: "var(--white)",
							boxShadow: "var(--shadow-default)",
							borderRadius: "var(--rounded-lg)",
						}}
						className="justify-content-center align-items-center"
						gap={4}
						direction="vertical"
					>
						<h3
							style={{
								fontSize: "32px",
								fontWeight: "bold",
							}}
							className="m-0 mt-5"
						>
							Our Services
						</h3>
						<Stack gap={3}>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-center"
							>
								<Link
									style={{
										textDecoration: "none",
										color: "var(--dark-grey)",
										fontSize: "20px",
										backgroundColor: "var(--variant-two)",
									}}
									className="rounded-pill px-4 py-2"
								>
									Sell and Buy Equipment
								</Link>
								<Link
									style={{
										textDecoration: "none",
										color: "var(--dark-grey)",
										fontSize: "20px",
										backgroundColor: "var(--variant-one)",
									}}
									className="rounded-pill px-4 py-2"
								>
									Request Equipment Repair
								</Link>
							</Stack>
							<Stack
								direction="horizontal"
								gap={3}
								className="justify-content-center"
							>
								<Link
									style={{
										textDecoration: "none",
										color: "var(--dark-grey)",
										fontSize: "20px",
										backgroundColor: "var(--variant-one)",
									}}
									className="rounded-pill px-4 py-2"
								>
									Create Beneficiary Project
								</Link>
								<Link
									style={{
										textDecoration: "none",
										color: "var(--dark-grey)",
										fontSize: "20px",
										backgroundColor: "var(--variant-two)",
									}}
									className="rounded-pill px-4 py-2"
								>
									Donate Equipment
								</Link>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}
