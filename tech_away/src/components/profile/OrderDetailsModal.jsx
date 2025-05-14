import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Stack, Col } from "react-bootstrap";
import api from "../../utils/axios";

export default function OrderDetailsModal({
	showDetails,
	setShowDetails,
	order,
}) {
	const [orderedEquipments, setOrderedEquipments] = useState([]);
	const [storeData, setStoreData] = useState(null);

	const fetchOrderedEquipments = async () => {
		try {
			const response = await api.get(
				`/api/purchaseCartEquipment/order/${order.id}`
			);
			console.log(response.data);

			setOrderedEquipments(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchStoreData = async (storeId) => {
		try {
			const response = await api.get(`/api/store/${storeId}`);
			setStoreData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchOrderedEquipments();
	}, [showDetails]);

	useEffect(() => {
		console.log("storeData", storeData);

		if (order.storeId) {
			fetchStoreData(order.storeId);
		}
	}, [showDetails]);

	useEffect(() => {
		console.log(orderedEquipments);
	}, [orderedEquipments]);

	return (
		<Modal
			show={showDetails}
			onHide={setShowDetails}
			size="lg"
			centered={true}
			style={{ color: "var(--dark-grey)", fontFamily: "var(--body-font)" }}
		>
			<Stack
				direction="vertical"
				gap={2}
				className="p-4 rounded"
				style={{
					backgroundColor: "var(--white)",
				}}
			>
				<Stack
					direction="horizontal"
					className="justify-content-between align-items-center"
				>
					<h4 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
						Order ID: {order.id}
					</h4>
					<Button
						style={{
							backgroundColor: "transparent",
							border: "none",
							color: "var(--dark-grey)",
						}}
						onClick={() => setShowDetails(false)}
					>
						<i className="pi pi-times" style={{ fontSize: "1.5rem" }}></i>
					</Button>
				</Stack>
				<Stack direction="horizontal" gap={2}>
					<h6 className="m-0" style={{ opacity: "0.7" }}>
						{new Date(order.createdAt).toLocaleDateString("pt-PT")}
					</h6>
				</Stack>
				<Row>
					<Col sm={12} md={8}>
						{orderedEquipments.map((equipment, key) => (
							<Stack
								key={key}
								direction="horizontal"
								className="justify-content-between align-items-center"
								style={{
									backgroundColor: "#eae6f0",
									borderRadius: "10px",
									padding: "20px",
									borderRadius: "16px",
									marginBottom: "10px",
								}}
							>
								olaaaaa
							</Stack>
						))}
					</Col>
					<Col sm={12} md={4}>
						<Stack direction="vertical" gap={2}>
							<Stack direction="vertical" gap={2}>
								<h6 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
									Order Status: {order.OrderStatus.state}
								</h6>
								<p className="m-0" style={{ opacity: "0.7" }}>
									Last Update:{" "}
									{new Date(order.updatedAt).toLocaleDateString("pt-PT")}
								</p>
							</Stack>
							<Stack direction="vertical" gap={2}>
								{storeData && order.storeId ? (
									<span>
										<h6
											className="m-0"
											style={{ fontFamily: "var(--title-font)" }}
										>
											To Pickup in Store
										</h6>
										<p></p>
									</span>
								) : (
									<h6
										className="m-0"
										style={{ fontFamily: "var(--title-font)" }}
									>
										Pickup in store
									</h6>
								)}
							</Stack>
						</Stack>
					</Col>
				</Row>
			</Stack>
		</Modal>
	);
}
