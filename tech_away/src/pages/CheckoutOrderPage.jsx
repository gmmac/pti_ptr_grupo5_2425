import React, { useState } from "react";
import { Stack, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import OnCanvasCart from "../components/cart/OnCanvasCart";
import Payment from "../components/payment/Payment";
import Swirl from "../components/svg/Swirl";

export default function CheckoutOrderPage() {
	const navigate = useNavigate();
	const [shippingMethod, setShippingMethod] = useState("store");

	const goBack = () => {
		navigate(-1);
	};

	return (
		<Container style={{ fontFamily: "var(--body-font)" }}>
			<Row className="g-4 pb-3 mx-0">
				<div
					style={{
						borderRadius: "var(--rounded-sm)",
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						WebkitMaskImage: "inset(0 round var(--rounded-lg))",
						maskImage: "inset(0 round var(--rounded-lg))",
						position: "relative",
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							width: "150%",
							height: "150%",
							top: -160,
							right: -600,
						}}
					>
						<Swirl
							w="100%"
							h="170%"
							vb="0 0 530 600"
							d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
							color="var(--variant-one)"
							strokeWidth="40"
						/>
					</div>
					<Stack
						direction="horizontal"
						className="px-2 py-5"
						gap={3}
						onClick={goBack}
					>
						<Button
						as="Link"
							className="rounded-circle d-flex align-items-center justify-content-center"
							style={{
								width: "35px",
								height: "35px",
								backgroundColor: "var(--variant-two)",
								color: "white",
								border: "none",
							}}
						>
							<i
								className="pi pi-arrow-left"
								style={{ fontSize: "1.3rem" }}
							></i>
						</Button>
						<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
							Payment Checkout
						</h5>
					</Stack>
				</div>
			</Row>
			<Row className="g-4">
				<Col xs={12} md={5} lg={5} className="d-flex flex-column">
					<Stack
						className="p-4 flex-grow-1"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
							boxShadow: "var(--shadow-default)",
						}}
					>
						<OnCanvasCart />
					</Stack>
				</Col>
				<Col xs={12} md={7} lg={7} className="d-flex flex-column gap-4">
					<Stack
						className="p-4 flex-grow-1"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
							boxShadow: "var(--shadow-default)",
						}}
					>
						<Stack direction="horizontal" gap={2}>
							<h5
								className="rounded-circle d-flex align-items-center justify-content-center"
								style={{
									width: "35px",
									height: "35px",
									backgroundColor: "var(--variant-two)",
									color: "white",
								}}
							>
								2
							</h5>
							<h5>Shipping Details</h5>
						</Stack>
						<Form className="mt-3">
							<Form.Check
								type="radio"
								id="storePickup"
								label="Pickup in Store"
								name="shippingMethod"
								checked={shippingMethod === "store"}
								onChange={() => setShippingMethod("store")}
							/>
							<Form.Check
								type="radio"
								id="homeDelivery"
								label="Home Delivery"
								name="shippingMethod"
								checked={shippingMethod === "home"}
								onChange={() => setShippingMethod("home")}
							/>
							{shippingMethod === "home" && (
								<div className="mt-3">
									<Form.Group className="mb-2">
										<Form.Label>Address</Form.Label>
										<Form.Control
											className="rounded-pill"
											type="text"
											placeholder="Number, Street"
										/>
									</Form.Group>
								</div>
							)}
						</Form>
					</Stack>
					<Stack
						className="p-4 flex-grow-1"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
							boxShadow: "var(--shadow-default)",
						}}
					>
						<Stack direction="horizontal" gap={2}>
							<h5
								className="rounded-circle d-flex align-items-center justify-content-center"
								style={{
									width: "35px",
									height: "35px",
									backgroundColor: "var(--variant-two)",
									color: "white",
								}}
							>
								3
							</h5>
							<h5>Payment</h5>
						</Stack>
						<Payment />
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
