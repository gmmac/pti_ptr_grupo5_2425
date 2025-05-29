import React, { useEffect, useState, useContext } from "react";
import { Container, Image, Stack, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../utils/axios";
import EquipmentSheetInfo from "../components/EquipmentSheetPage/EquipmentSheetInfo";
import UsedEquipmentCard from "../components/EquipmentSheetPage/UsedEquipmentCard";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";
import PaginationControl from "../components/pagination/PaginationControl";
import Filters from "../components/EquipmentSheetPage/Filters";

export default function EquipmentSheetPage() {
	const location = useLocation();
	const barcode = location.state?.barcode;

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const [equipmentSheet, setEquipmentSheet] = useState({});
	const [usedEquipmentList, setUsedEquipmentList] = useState([]);
	const [totalPages, setTotalPages] = useState(1);

	const [filters, setFilters] = useState({
		orderBy: "",
		state: "",
	});

	const isMobile = useContext(IsMobileContext);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	// Fetch equipment sheet info
	useEffect(() => {
		if (!barcode) return;

		api
			.get(`api/equipmentSheet/${barcode}`)
			.then((res) => {
				setEquipmentSheet(res.data.equipmentSheet);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [barcode]);

	// Fetch used equipment list
	useEffect(() => {
		const getId = (value) => {
			if (Array.isArray(value)) return value.map((v) => v.id);
			if (typeof value === "object" && value !== null) return value.id;
			return value;
		};
		const fetchUsedEquipment = async () => {
			try {
				const params = {
					equipmentId: barcode,
					stateId: getId(filters.state),
					orderBy: filters.orderBy || "recent-date",
					page: currentPage,
					pageSize: itemsPerPage,
				};

				const response = await api.get("/api/usedEquipment/in-stock/", {
					params,
				});
				setUsedEquipmentList(response.data.data);
				setTotalPages(response.data.totalPages);
			} catch (error) {
				console.error("API error:", error.message);
			}
		};

		if (barcode) fetchUsedEquipment();
	}, [barcode, filters, currentPage]);

	return (
		<Container className="mb-navbar">
			<Stack direction="vertical" gap={3}>
				<Stack direction="horizontal" gap={3}>
					<EquipmentSheetInfo equipmentInfo={equipmentSheet} />
					{!isMobile && (
						<MapProvider filters={filters} setFilters={setFilters} />
					)}
				</Stack>
				<Filters filters={filters} setFilters={setFilters} />
				<Row className="g-4">
					{usedEquipmentList && usedEquipmentList.length > 0 ? (
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

				{totalPages > 1 && (
					<PaginationControl
						handlePageChange={handlePageChange}
						currentPage={currentPage}
						totalPages={totalPages}
					/>
				)}
			</Stack>
		</Container>
	);
}
