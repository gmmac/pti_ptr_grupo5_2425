import React from "react";
import { Container, Stack } from "react-bootstrap";
import Swirl from "../svg/Swirl";
import DivTelem from "./DivTelem";
import DivJoin from "./DivJoin";
import DivOurServices from "./DivOurServices";

export default function SMcontent(isMobile) {
	return (
		<Container>
			<Stack gap={4}>
				<Stack
					direction="horizontal"
					style={{
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						borderRadius: "0 0 var(--rounded-sm) var(--rounded-sm)",
						height: "170px",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
					}}
					className="justify-content-between overflow-hidden"
				>
					<h1 className="ps-4 fs-1" style={{ fontFamily: "var(--title-font)" }}>
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
					<Swirl
						w="80%"
						h="170%"
						vb="0 0 530 600"
						d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
						color="var(--variant-two)"
						strokeWidth="40"
					/>
				</Stack>

				<DivTelem />
				<DivJoin />
				<DivOurServices />
				<div style={{ height: "75px" }}></div>
			</Stack>
		</Container>
	);
}
