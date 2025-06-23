import { useState, useEffect } from "react";
import { Stack, Form, Button } from "react-bootstrap";
import api from "../../utils/axios";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";
import OrderCard from "./OrderCard";

export default function PurchaseTab() {
	const [purchases, setPurchases] = useState([]);
	const [filterDate, setFilterDate] = useState("");
	const { user } = useAuth();

	useEffect(() => {
		if (user?.nic) {
			fetchPurchases();
		}
	}, [user, filterDate]);

	const fetchPurchases = async () => {
		try {
			const params = {};
			if (filterDate) {
				params.createdAt = filterDate;
			}

			const res = await api.get(
				`/api/clientPurchase/client-orders/${user.nic}`,
				{ params }
			);
			setPurchases(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Stack direction="vertical" gap={3} className="px-4">
			<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
				My Purchases
			</h5>

			<Form.Group className="mb-2" controlId="filterDate">
				<Form.Label style={{ color: "var(--variant-two-dark" }}>
					Filter by date
				</Form.Label>
				<Stack
					style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
					direction="horizontal"
				>
					<Form.Control
						type="date"
						className="rounded-pill"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
					<Button
						variant="secondary"
						className="rounded-pill w-25"
						onClick={() => setFilterDate("")}
						disabled={!filterDate}
					>
						Clear
					</Button>
				</Stack>
			</Form.Group>

			<Stack
				direction="vertical"
				className="pe-2"
				gap={2}
				style={{ overflowY: "auto", height: "350px" }}
			>
				{purchases.length > 0 ? (
					purchases.map((purchase) => (
						<OrderCard key={purchase.id} order={purchase} />
					))
				) : (
					<p className="text-muted text-center">No purchases found</p>
				)}
			</Stack>
		</Stack>
	);
}
