import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Stack, Col, Image } from "react-bootstrap";
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

			const equipment = response.data;

			const equimentInfo = [];

			for (const e in equipment) {
				const res = await api.get(
					`/api/usedEquipment/by-used-equiment-id/${equipment[e].equipmentId}`
				);

				equimentInfo.push(res.data);
			}

			setOrderedEquipments(equimentInfo);
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
						<Stack
							direction="horizontal"
							gap={2}
							className="justify-content-between mb-2"
						>
							<h6 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
								{orderedEquipments.length} items ordered
							</h6>

							<h6 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
								Total Price: {order.total} €
							</h6>
						</Stack>
						{orderedEquipments.map((equipment, key) => (
							<Stack
								key={key}
								direction="horizontal"
								className="justify-content-between align-items-center"
								style={{
									backgroundColor: "var(--variant-two-light)",
									padding: "20px",
									borderRadius: "16px",
									marginBottom: "10px",
								}}
								gap={2}
							>
								<Image
									src="../../public/assets/ip.png"
									className="w-25 rounded-3"
									style={{
										objectFit: "cover",
										// mixBlendMode: "darken",
									}}
								/>
								<Stack direction="vertical">
									<h6
										className="m-0"
										style={{ fontFamily: "var(--title-font)" }}
									>
										{
											equipment.usedEquipments.EquipmentSheet.EquipmentModel
												.name
										}
									</h6>
									<p className="m-0 ">
										{equipment.usedEquipments.EquipmentStatus.state}
									</p>
									<p className="m-0">{equipment.usedEquipments.price} €</p>
								</Stack>
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
											To Pickup in Store:
										</h6>
										<span className="d-flex flex-row align-items-center justify-content-start gap-2">
											<i className="pi pi-map-marker"></i>
											<p className="m-0">{storeData.name}</p>
										</span>
										<span className="d-flex flex-row align-items-center justify-content-start gap-2">
											<i className="pi pi-phone"></i>
											<p className="m-0">{storeData.phone}</p>
										</span>
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
