import React, { useEffect, useState } from "react";
// import { useFilter } from "../contexts/FilterProvider";
// import FilterSearch from "../components/StorePage/FilterSearch";
import api from "../utils/axios";
import EquipmentSheetCatalogue from "../components/StorePage/EquipmentSheetCatalogue";
import { Container } from "react-bootstrap";

export default function StorePage() {
	const [equipmentModelCatalog, setEquipmentModelCatalog] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const itemsPerPage = 6;

	// const { filters } = useFilter();

	// useEffect(() => {}, [filters]);

	const [refresh, setRefresh] = useState(false);

	const handleRefresh = () => {
		setRefresh(!refresh);
	};

	useEffect(() => {
		api
			.get("/api/equipmentSheet/in-stock", {
				params: {
					page: currentPage,
					pageSize: itemsPerPage,
					orderBy: "createdAt", // Para ordenação dinâmica
					orderDirection: "DESC",
				},
			})
			.then((res) => {
				setEquipmentModelCatalog(res.data.data);
				setTotalPages(res.data.totalPages);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, [currentPage, refresh]); // Se usares filtros, adiciona `filters` à lista de dependências

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<Container>
			<EquipmentSheetCatalogue equipmentSheets={equipmentModelCatalog} />
		</Container>
	);
}
