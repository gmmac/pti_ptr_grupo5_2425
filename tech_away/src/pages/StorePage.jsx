import React, { useEffect, useState, useContext, use } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import EquipmentSheetCard from "../components/StorePage/EquipmentSheetCard";
import PaginationControl from "../components/pagination/PaginationControl";
import api from "../utils/axios";
import Filters from "../components/StorePage/Filters";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";
import Swirl from "../components/svg/Swirl";
import SecondLife from "../components/decoration/SecondLife";
import SecondLifeSm from "../components/decoration/SecondLifeSm";
import DisplayedFilters from "../components/StorePage/DisplayedFilters";

export default function StorePage() {
	const [equipmentModelCatalog, setEquipmentModelCatalog] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const itemsPerPage = 12;
	const [filters, setFilters] = useState({
		orderBy: "",
		type: "",
		model: "",
		brand: "",
		store: "",
	});
	const isMobile = useContext(IsMobileContext);

	const [showMap, setShowMap] = useState(false);

	useEffect(() => {
		const getId = (value) => {
			if (Array.isArray(value)) return value.map((v) => v.id);
			if (typeof value === "object" && value !== null) return value.id;
			return value;
		};
		api
			.get("/api/equipmentSheet/in-stock", {
				params: {
					page: currentPage,
					pageSize: itemsPerPage,
					orderBy: filters.orderBy || "recent-date", // Use selected orderBy or default to createdAt
					modelId: getId(filters.model),
					typeId: getId(filters.type),
					brandId: getId(filters.brand),
					storeId: getId(filters.store),
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
	useEffect(() => {
		console.log(filters);
	}, [filters]);

	return (
		<Container className="mb-navbar" style={{ fontFamily: "var(--body-font)" }}>
			<Stack gap={4} direction="vertical" className="mb-5">
				{isMobile ? <SecondLifeSm /> : <SecondLife />}

				<Stack gap={4}>
					<Stack
						direction="horizontal"
						gap={2}
						className={isMobile ? "align-items-start" : "align-items-center"}
					>
						<Button
							className="rounded-pill px-3 py-3 d-flex justify-content-center align-items-center gap-2"
							style={{
								backgroundColor: "var(--variant-two)",
								border: "none",
								color: "var(--dark-grey)",
								boxShadow: "var(--shadow-default)",
							}}
							onClick={() => setShowMap(!showMap)}
						>
							<i className="pi pi-map"></i>
							<p className="m-0">{showMap ? "Hide Map" : "Show Map"}</p>
						</Button>

						<div className="flex-grow-1">
							<Filters filters={filters} setFilters={setFilters} />
						</div>
					</Stack>

					{/* Mapa */}
					{showMap && (
						<div
							className="rounded-sm"
							style={{
								boxShadow: "var(--shadow-default)",
							}}
						>
							<MapProvider filters={filters} setFilters={setFilters} />
						</div>
					)}
					<DisplayedFilters filters={filters} setFilters={setFilters} />
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
			</Stack>
		</Container>
	);
}
