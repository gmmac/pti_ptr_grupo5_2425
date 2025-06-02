import React, { useState, useEffect, use } from "react";
import { Stack, Row, Col } from "react-bootstrap";
import api from "../../utils/axios";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import OrderCard from "./OrderCard";

export default function PurchaseTab() {
	const [purchases, setPurchases] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		fetchPurchases();
	}, [user]);

	useEffect(() => {
		console.log(purchases);
	}, [purchases]);
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
			<Stack
				direction="vertical"
				className="pe-2"
				gap={2}
				style={{ overflowY: "auto", height: "450px" }}
			>
				{purchases.map((purchase) => (
					<OrderCard key={purchase.id} order={purchase} />
				))}
			</Stack>
		</Stack>
	);
}
