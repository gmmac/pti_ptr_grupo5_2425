import React, { useEffect, useState } from "react";
import { Container, Image, Stack, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import EquipmentSheetInfo from "../components/EquipmentSheetPage/EquipmentSheetInfo";
import UsedEquipmentCard from "../components/EquipmentSheetPage/UsedEquipmentCard";

export default function EquipmentSheetPage() {
	const location = useLocation();
	const barcode = location.state?.barcode;

	const [equipmentSheet, setEquipmentSheet] = useState({});
	const [refresh, setRefresh] = useState(false);

	const [usedEquipmentList, setUsedEquipmentList] = useState({});

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		api
			.get(`api/equipmentSheet/${barcode}`)
			.then((res) => {
				setEquipmentSheet(res.data.equipmentSheet);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [refresh]);

	useEffect(() => {
		api
			.get(`api/usedEquipment/${barcode}`)
			.then((res) => {
				setUsedEquipmentList(res.data.usedEquipments);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [refresh]);

	return (
		<Container>
			<Stack direction="vertical" gap={3}>
				<Stack direction="horizontal" gap={3}>
					<EquipmentSheetInfo equipmentInfo={equipmentSheet} />

					{/* Esta imagem é para ser substituida pelo mapa interarivo */}
					<Image
						src="../../public/assets/mapa.png"
						style={{ boxShadow: "var(--shadow-default)" }}
						className="rounded-sm"
					/>
				</Stack>
				<Row className="g-4">
					{usedEquipmentList.length > 0 ? (
						usedEquipmentList.map((usedEquipment, index) => (
							<Col key={index} xs={12} sm={6} md={4} lg={3}>
								<UsedEquipmentCard usedEquipment={usedEquipment} />
							</Col>
						))
					) : (
						<Col xs={12} className="text-center mt-5">
							<i className="pi pi-exclamation-triangle"></i>
							<p className="m-0">No equipment found</p>
						</Col>
					)}
				</Row>
			</Stack>
		</Container>
	);
}
