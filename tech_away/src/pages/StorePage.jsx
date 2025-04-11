import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import EquipmentSheetCard from "../components/StorePage/EquipmentSheetCard";
import PaginationControl from "../components/pagination/PaginationControl";
import api from "../utils/axios";
import Filters from "../components/StorePage/Filters";

export default function StorePage() {
	const [equipmentModelCatalog, setEquipmentModelCatalog] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const itemsPerPage = 9;
	const [filters, setFilters] = useState({
		orderBy: "",
		type: "",
		model: "",
		brand: "",
	});

	useEffect(() => {
		api
			.get("/api/equipmentSheet/in-stock", {
				params: {
					page: currentPage,
					pageSize: itemsPerPage,
					orderBy: filters.orderBy || "recent-date", // Use selected orderBy or default to createdAt
					modelId: filters.model,
					typeId: filters.type,
					brandId: filters.brand,
				},
			})
			.then((res) => {
				setEquipmentModelCatalog(res.data.data);
				setTotalPages(res.data.totalPages);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [currentPage, filters]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<Container className="mb-5">
			<Stack gap={4}>
				{/* Mapa */}
				<div
					style={{
						fontFamily: "var(--body-font)",
						color: "var(--dark-grey)",
						backgroundColor: "var(--white)",
						boxShadow: "var(--shadow-default)",
						height: "300px",
					}}
					className="rounded-sm p-4 d-flex justify-content-center align-items-center"
				>
					mapa
				</div>

				<Filters filters={filters} setFilters={setFilters} />

				{/* Grid de Equipamentos */}
				<Row className="g-4">
					{equipmentModelCatalog.length > 0 ? (
						equipmentModelCatalog.map((item, index) => (
							<Col key={index} xs={12} sm={6} md={4} lg={3}>
								<EquipmentSheetCard eSheet={item} />
							</Col>
						))
					) : (
						<Col xs={12} className="text-center mt-5">
							<i className="pi pi-exclamation-triangle"></i>
							<p className="m-0">No equipment found</p>
						</Col>
					)}
				</Row>

				{/* Paginação */}
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
