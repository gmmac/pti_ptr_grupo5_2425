import React, { useState } from "react";
import { Stack, Col, Container, Row, Form } from "react-bootstrap";
import OnCanvasCart from "../components/cart/OnCanvasCart";

export default function CheckoutOrderPage() {
	const [shippingMethod, setShippingMethod] = useState("store");
	return (
		<Container style={{ fontFamily: "var(--body-font)" }}>
			<Row className="g-4">
				<Col
					className="p-4 flex-grown-1"
					style={{
						backgroundColor: "var(--white)",
						borderRadius: "var(--rounded-sm)",
					}}
				>
					<OnCanvasCart />
				</Col>
				<Col>
					<Row
						className="p-4"
						style={{
							backgroundColor: "var(--white)",
							borderRadius: "var(--rounded-sm)",
						}}
					>
						<Stack direction="horizontal" gap={2}>
							<h5
								className="border rounded-circle d-flex align-items-center justify-content-center"
								style={{ width: "35px", height: "35px" }}
							>
								2
							</h5>
							<h5> Shipping Info</h5>
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
					</Row>
					<Row
						className="p-4"
						style={{
							backgroundColor: "var(--white)",
							borderRadius: "var(--rounded-sm)",
						}}
					>
						<Stack direction="horizontal" gap={2}>
							<h5
								className="border rounded-circle d-flex align-items-center justify-content-center"
								style={{ width: "35px", height: "35px" }}
							>
								3
							</h5>
							<h5>Payment</h5>
						</Stack>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
