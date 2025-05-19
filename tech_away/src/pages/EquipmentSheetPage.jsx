import React, { useEffect, useState, useContext } from "react";
import { Container, Image, Stack, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import EquipmentSheetInfo from "../components/EquipmentSheetPage/EquipmentSheetInfo";
import UsedEquipmentCard from "../components/EquipmentSheetPage/UsedEquipmentCard";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";

export default function EquipmentSheetPage() {
	const location = useLocation();
	const barcode = location.state?.barcode;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const itemsPerPage = 8;
	const [equipmentSheet, setEquipmentSheet] = useState({});
	const [filters, setFilters] = useState({
		price: "",
		dates: "",
		state: "",
	});
	const isMobile = useContext(IsMobileContext);

	const [usedEquipmentList, setUsedEquipmentList] = useState({});

	useEffect(() => {
		api
			.get(`api/equipmentSheet/${barcode}`)
			.then((res) => {
				setEquipmentSheet(res.data.equipmentSheet);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	useEffect(() => {
		api
			.get(`api/usedEquipment/in-stock/${barcode}`)
			.then((res) => {
				setUsedEquipmentList(res.data.usedEquipments);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	return (
		<Container className="mb-navbar">
			<Stack direction="vertical" gap={3}>
				<Stack direction="horizontal" gap={3}>
					<EquipmentSheetInfo equipmentInfo={equipmentSheet} />
					{!isMobile && (
						<MapProvider filters={filters} setFilters={setFilters} />
					)}
				</Stack>
				<Row className="g-4">
					{usedEquipmentList.length > 0 ? (
						usedEquipmentList.map((usedEquipment, index) => (
							<Col key={index} xs={12} sm={6} md={6} lg={4}>
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
