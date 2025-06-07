import React from "react";
import { Stack } from "react-bootstrap";
import Swirl from "../svg/Swirl";

export default function SecondLife() {
	return (
		<Stack
			direction="horizontal"
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
				height: "250px",
				WebkitMaskImage: "inset(0 round var(--rounded-lg))",
				maskImage: "inset(0 round var(--rounded-lg))",
			}}
			className="justify-content-between overflow-hidden rounded-lg"
		>
			<div>
				<Swirl
					w="100%"
					h="100%"
					vb="0 0 253 389"
					d="M240.566 22.7001C218.287 8.41487 166.444 5.04993 152.063 32.1988C133.394 67.4432 142.824 118.261 178.926 139.197C190.295 145.789 203.799 149.326 215.163 140.831C222.521 135.332 219.221 124.208 215.485 117.576C206.414 101.471 180.357 91.002 163.506 87.7744C132.58 81.8509 101.705 98.9624 84.3824 123.507C51.629 169.916 70.3166 250.048 129.66 262.772C141.037 265.212 157.358 260.82 160.724 248.012C164.571 233.372 151.3 215.161 140.56 206.823C102.823 177.531 46.0862 197.861 22.8449 235.403C-5.47404 281.147 25.5272 338.999 53.6548 376.63"
					color="var(--variant-one)"
					strokeWidth="23"
				/>
			</div>

			<h1
				style={{
					fontSize: "64px",
				}}
				className="text-center"
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
			<div style={{position:"relative",top:"30px", right:"50px"}}>
				<Swirl
					w="115%"
					h="100%"
					vb="0 0 249 310"
					d="M11.9177 294.88C41.8095 298.335 71.6387 302.409 97.5961 287.88C124.356 272.903 137.825 246.854 124.516 215.399C116.369 196.142 98.2468 180.514 77.5424 177.021C68.599 175.513 59.8333 176.442 54.134 182.891C49.0756 188.614 59.7516 196.136 64.3429 199.092C86.719 213.497 111.517 216.403 136.278 215.117C167.883 213.476 196.421 203.511 209.916 174.505C228.661 134.217 222.829 62.0546 170.44 40.1992C156.311 34.305 135.394 25.134 121.333 32.3274C112.323 36.9367 109.14 45.928 113.928 56.11C120.644 70.3901 139.504 80.3518 153.556 84.6747C172.238 90.4217 194.681 89.3446 208.519 77.0856C219.288 67.5454 239.445 27.8798 236.438 12.2534"
					color="var(--variant-two)"
					strokeWidth="23"
				/>
			</div>
		</Stack>
	);
}
