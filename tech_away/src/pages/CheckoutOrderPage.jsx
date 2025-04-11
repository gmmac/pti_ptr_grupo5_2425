import React, { useState } from "react";
import { Stack, Col, Container, Row, Form, Card } from "react-bootstrap";
import OnCanvasCart from "../components/cart/OnCanvasCart";
import Payment from "../components/payment/Payment";

export default function CheckoutOrderPage() {
	const [shippingMethod, setShippingMethod] = useState("store");
	return (
		<Container style={{ fontFamily: "var(--body-font)" }}>
			<Row className="g-4">
				<Col xs={12} md={5} lg={5} className="d-flex flex-column">
					<Stack
						className="p-4 flex-grow-1 shadow-sm"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
						}}
					>
						<OnCanvasCart />
					</Stack>
				</Col>
				<Col xs={12} md={7} lg={7} className="d-flex flex-column gap-4">
					<Stack
						className="p-4 flex-grow-1 shadow-sm"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
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
						className="p-4 flex-grow-1 shadow-sm"
						style={{
							borderRadius: "var(--rounded-sm)",
							backgroundColor: "var(--white)",
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
