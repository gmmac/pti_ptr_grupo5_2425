import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import Swirl from "../components/svg/Swirl";

export default function AboutPage() {
	return (
		<Container
			fluid
			className="pb-5"
			style={{ fontFamily: "var(--title-font)" }}
		>
			<Row
				className="gx-3 gy-3 justify-content-center gap-3 my-2"
				style={{ height: "200px" }}
			>
				<Col
					style={{
						backgroundColor: "var(--variant-one)",

						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 100px",
					}}
					lg={2}
				></Col>
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 35px 35px 100px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",

								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100">
						<h2 style={{ color: "var(--variant-two)" }}>About Us</h2>
					</Stack>
				</Col>
				<Col
					style={{
						backgroundColor: "var(--variant-two)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px 35px 35px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -100,
							left: 200,
							width: "300px",
							transform: "rotate(180deg)",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--light-grey)"
							strokeWidth="23"
							style={{
								position: "absolute",
								zIndex: "1",
							}}
						/>
					</div>
				</Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 100px",
					}}
				></Col>
			</Row>
			<Row
				className="gx-3 gy-3 justify-content-center gap-3 my-2"
				style={{ height: "200px" }}
			>
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px 35px 35px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
							transform: "rotate(180deg)",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",
								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100 text-center">
						<h2 style={{ color: "var(--variant-two)" }}>
							Gustavo Machado <br /> 60249
						</h2>
					</Stack>
				</Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px",
					}}
				></Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 100px",
					}}
				></Col>
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 35px 35px 100px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",

								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100 text-center">
						<h2 style={{ color: "var(--variant-two)" }}>
							Diogo Roque <br /> 60274
						</h2>
					</Stack>
				</Col>
			</Row>
			<Row
				className="gx-3 gy-3 justify-content-center gap-3 my-2"
				style={{ height: "200px" }}
			>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 100px",
					}}
				></Col>
				<Col
					style={{
						backgroundColor: "var(--variant-two)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px 35px 35px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -100,
							left: 200,
							width: "300px",
							transform: "rotate(180deg)",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--light-grey)"
							strokeWidth="23"
							style={{
								position: "absolute",
								zIndex: "1",
							}}
						/>
					</div>
				</Col>
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px 35px 35px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
							transform: "rotate(180deg)",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",
								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100 text-center">
						<h2 style={{ color: "var(--variant-two)" }}>
							João Sequinho <br /> 58817
						</h2>
					</Stack>
				</Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px",
					}}
				></Col>
			</Row>
			<Row
				className="gx-3 gy-3 justify-content-center gap-3 my-2"
				style={{ height: "200px" }}
			>
				{" "}
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px 35px 35px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
							transform: "rotate(180deg)",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",
								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100 text-center">
						<h2 style={{ color: "var(--variant-two)" }}>
							Leonor Cardoso
							<br /> 60280
						</h2>
					</Stack>
				</Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "100px 35px",
					}}
				></Col>
				<Col
					lg={2}
					style={{
						backgroundColor: "var(--variant-one)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 100px",
					}}
				></Col>
				<Col
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "35px 35px 35px 100px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: -200,
							left: 200,
							width: "300px",
						}}
					>
						<Swirl
							w="559"
							h="554"
							vb="0 0 559 554"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-two)"
							strokeWidth="23"
							style={{
								position: "absolute",

								zIndex: "1",
							}}
						/>
					</div>

					<Stack className="justify-content-center align-items-center h-100 text-center">
						<h2 style={{ color: "var(--variant-two)" }}>
							Mariana Silva <br /> 60248
						</h2>
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
