import React, { useState, useEffect, use } from "react";
import { Stack, Row, Col } from "react-bootstrap";
import api from "../../utils/axios";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function PurchaseTab() {
	const [purchases, setPurchases] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		fetchPurchases();
	}, [user]);
	const fetchPurchases = async () => {
		try {
			const res = await api.get(
				`/api/clientPurchase/client-orders/${user.nic}`
			);
			setPurchases(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Stack direction="vertical" gap={3} className="px-4">
			<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
				My Orders
			</h5>
			<Stack direction="vertical" gap={2}>
				<Stack direction="vertical" gap={2} style={{ height: "450px" }}>
					{purchases.map((purchase) => (
						<Row key={purchase.id} className="mb-3">
							<Col
								className=""
								style={{
									backgroundColor: "var(--white)",
									fontFamily: "var(--body-font)",
								}}
							>
								<h6>Order ID: {purchase.id}</h6>
								<p>Total Price: {purchase.total}</p>
								<p>Date: {new Date(purchase.createdAt).toLocaleDateString()}</p>
							</Col>
							<Col>
								<Stack direction="vertical" gap={2} className=""></Stack>
							</Col>
						</Row>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
}
